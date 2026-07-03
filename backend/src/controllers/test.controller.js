const { Test, TestResult, Enrollment } = require('../models');
const { AppError, NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getTests = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const filter = { course: courseId };

  if (req.query.type) filter.type = req.query.type;
  if (req.user?.role !== 'admin' && req.user?.role !== 'teacher') {
    filter.isPublished = true;
  }

  const features = new APIFeatures(Test.find(filter).select('-questions.correctAnswer'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tests = await features.query;
  const total = await Test.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { tests }, pagination);
});

const getTestById = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);

  if (!test) {
    throw new NotFoundError('Test');
  }

  if (!test.isPublished && req.user?.role !== 'admin' && req.user?.role !== 'teacher') {
    throw new NotFoundError('Test');
  }

  const testObj = test.toObject();

  if (req.user?.role === 'admin' || req.user?.role === 'teacher') {
    sendResponse(res, 200, { test: testObj });
    return;
  }

  const result = await TestResult.findOne({
    test: test._id,
    student: req.user._id,
  });

  if (!result) {
    const { correctAnswer, ...safeQuestions } = testObj.questions.map((q) => {
      const { correctAnswer, ...rest } = q;
      return rest;
    });
    testObj.questions = safeQuestions;
  }

  sendResponse(res, 200, { test: testObj });
});

const createTest = asyncHandler(async (req, res) => {
  const test = await Test.create({
    ...req.body,
    teacher: req.user._id,
  });

  sendResponse(res, 201, { test }, 'Test created successfully');
});

const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    throw new NotFoundError('Test');
  }

  if (req.user.role !== 'admin' && test.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only update your own tests');
  }

  Object.assign(test, req.body);
  await test.save();

  sendResponse(res, 200, { test }, 'Test updated successfully');
});

const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    throw new NotFoundError('Test');
  }

  if (req.user.role !== 'admin' && test.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only delete your own tests');
  }

  await TestResult.deleteMany({ test: test._id });
  await test.deleteOne();

  sendResponse(res, 200, {}, 'Test deleted successfully');
});

const submitTest = asyncHandler(async (req, res) => {
  const { answers, timeTaken } = req.body;

  const test = await Test.findById(req.params.id);
  if (!test) {
    throw new NotFoundError('Test');
  }

  if (!test.isPublished) {
    throw new AppError('Test is not available', 400);
  }

  const enrollment = await Enrollment.findOne({
    student: req.user._id,
    course: test.course,
    status: 'active',
  });

  if (!enrollment) {
    throw new AppError('You are not enrolled in this course', 403);
  }

  const existingResults = await TestResult.countDocuments({
    test: test._id,
    student: req.user._id,
  });

  if (existingResults >= test.attemptsAllowed) {
    throw new AppError('Maximum attempts reached', 400);
  }

  if (!answers || !Array.isArray(answers)) {
    throw new AppError('Answers are required', 400);
  }

  let totalMarksObtained = 0;
  const gradedAnswers = answers.map((answer) => {
    const question = test.questions[answer.questionIndex];
    if (!question) {
      return {
        questionIndex: answer.questionIndex,
        selectedOption: answer.selectedOption,
        isCorrect: false,
        marksObtained: 0,
      };
    }

    const isCorrect = question.correctAnswer === answer.selectedOption;
    const marksObtained = isCorrect
      ? question.marks
      : -question.negativeMarks;

    totalMarksObtained += marksObtained;
    return {
      questionIndex: answer.questionIndex,
      selectedOption: answer.selectedOption,
      isCorrect,
      marksObtained,
    };
  });

  totalMarksObtained = Math.max(0, totalMarksObtained);
  const percentage = (totalMarksObtained / test.totalMarks) * 100;

  const result = await TestResult.create({
    test: test._id,
    student: req.user._id,
    answers: gradedAnswers,
    totalMarksObtained,
    percentage: Math.round(percentage * 100) / 100,
    isPassed: totalMarksObtained >= test.passingMarks,
    timeTaken: timeTaken || 0,
    attemptNumber: existingResults + 1,
  });

  sendResponse(res, 201, { result }, 'Test submitted successfully');
});

const getTestResults = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  const test = await Test.findById(testId);
  if (!test) {
    throw new NotFoundError('Test');
  }

  if (req.user.role !== 'admin' && test.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only view results for your own tests');
  }

  const features = new APIFeatures(
    TestResult.find({ test: testId }).populate('student', 'name email avatar'),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const results = await features.query;
  const total = await TestResult.countDocuments({ test: testId });
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { results }, pagination);
});

const getMyResults = asyncHandler(async (req, res) => {
  const filter = { student: req.user._id };
  if (req.query.testId) filter.test = req.query.testId;

  const features = new APIFeatures(
    TestResult.find(filter).populate({
      path: 'test',
      select: 'title type totalMarks passingMarks duration course',
      populate: { path: 'course', select: 'title slug' },
    }),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const results = await features.query;
  const total = await TestResult.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { results }, pagination);
});

module.exports = {
  getTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
  submitTest,
  getTestResults,
  getMyResults,
};
