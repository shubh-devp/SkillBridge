const { Assignment, AssignmentSubmission, Enrollment } = require('../models');
const { AppError, NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getAssignments = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const filter = { course: courseId };

  if (req.user?.role !== 'admin' && req.user?.role !== 'teacher') {
    filter.isPublished = true;
  }

  const features = new APIFeatures(Assignment.find(filter).populate('teacher', 'name avatar'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const assignments = await features.query;
  const total = await Assignment.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { assignments }, pagination);
});

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.create({
    ...req.body,
    teacher: req.user._id,
  });

  await assignment.populate('teacher', 'name avatar');

  sendResponse(res, 201, { assignment }, 'Assignment created successfully');
});

const updateAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    throw new NotFoundError('Assignment');
  }

  if (req.user.role !== 'admin' && assignment.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only update your own assignments');
  }

  Object.assign(assignment, req.body);
  await assignment.save();

  sendResponse(res, 200, { assignment }, 'Assignment updated successfully');
});

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    throw new NotFoundError('Assignment');
  }

  if (req.user.role !== 'admin' && assignment.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only delete your own assignments');
  }

  await AssignmentSubmission.deleteMany({ assignment: assignment._id });
  await assignment.deleteOne();

  sendResponse(res, 200, {}, 'Assignment deleted successfully');
});

const submitAssignment = asyncHandler(async (req, res) => {
  const { content, attachments } = req.body;

  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    throw new NotFoundError('Assignment');
  }

  if (!assignment.isPublished) {
    throw new AppError('Assignment is not available for submission', 400);
  }

  const enrollment = await Enrollment.findOne({
    student: req.user._id,
    course: assignment.course,
    status: 'active',
  });

  if (!enrollment) {
    throw new AppError('You are not enrolled in this course', 403);
  }

  const existing = await AssignmentSubmission.findOne({
    assignment: assignment._id,
    student: req.user._id,
  });

  if (existing && existing.status !== 'resubmitted') {
    throw new AppError('Already submitted this assignment', 400);
  }

  const isLate = assignment.dueDate && new Date() > assignment.dueDate;

  if (existing) {
    existing.content = content || '';
    existing.attachments = attachments || [];
    existing.submittedAt = new Date();
    existing.status = 'submitted';
    existing.isLate = isLate;
    existing.grade = undefined;
    await existing.save();

    sendResponse(res, 200, { submission: existing }, 'Assignment resubmitted');
    return;
  }

  const submission = await AssignmentSubmission.create({
    assignment: assignment._id,
    student: req.user._id,
    content: content || '',
    attachments: attachments || [],
    isLate,
  });

  sendResponse(res, 201, { submission }, 'Assignment submitted successfully');
});

const gradeSubmission = asyncHandler(async (req, res) => {
  const { marksObtained, feedback } = req.body;

  if (marksObtained === undefined || marksObtained === null) {
    throw new AppError('Marks are required', 400);
  }

  const submission = await AssignmentSubmission.findById(req.params.id)
    .populate('assignment');
  if (!submission) {
    throw new NotFoundError('Submission');
  }

  const assignment = await Assignment.findById(submission.assignment._id || submission.assignment);
  if (!assignment) {
    throw new NotFoundError('Assignment');
  }

  if (req.user.role !== 'admin' && assignment.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only grade submissions for your own assignments');
  }

  if (marksObtained > assignment.totalMarks) {
    throw new AppError(`Marks cannot exceed ${assignment.totalMarks}`, 400);
  }

  submission.grade = {
    marksObtained,
    feedback: feedback || '',
    gradedBy: req.user._id,
    gradedAt: new Date(),
  };
  submission.status = 'graded';
  await submission.save();

  sendResponse(res, 200, { submission }, 'Submission graded successfully');
});

const getMySubmissions = asyncHandler(async (req, res) => {
  const filter = { student: req.user._id };
  if (req.query.assignmentId) filter.assignment = req.query.assignmentId;

  const features = new APIFeatures(
    AssignmentSubmission.find(filter).populate({
      path: 'assignment',
      select: 'title dueDate totalMarks course',
      populate: { path: 'course', select: 'title slug' },
    }),
    req.query
  )
    .sort()
    .limitFields()
    .paginate();

  const submissions = await features.query;
  const total = await AssignmentSubmission.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { submissions }, pagination);
});

module.exports = {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  gradeSubmission,
  getMySubmissions,
};
