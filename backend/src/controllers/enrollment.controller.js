const { Enrollment, Course, User } = require('../models');
const { AppError, NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const enrollCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    throw new AppError('Course ID is required', 400);
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError('Course');
  }

  if (!course.isPublished) {
    throw new AppError('Course is not available for enrollment', 400);
  }

  const existing = await Enrollment.findOne({
    student: req.user._id,
    course: courseId,
  });

  if (existing) {
    throw new AppError('Already enrolled in this course', 400);
  }

  const enrollment = await Enrollment.create({
    student: req.user._id,
    course: courseId,
    'progress.totalLectures': course.duration.totalLectures || 0,
    paymentInfo: {
      amount: course.price.amount,
      status: 'completed',
    },
  });

  await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

  await enrollment.populate([
    { path: 'course', select: 'title slug thumbnail price' },
    { path: 'student', select: 'name email' },
  ]);

  sendResponse(res, 201, { enrollment }, 'Enrolled successfully');
});

const getUserEnrollments = asyncHandler(async (req, res) => {
  const features = new APIFeatures(
    Enrollment.find({ student: req.user._id })
      .populate({
        path: 'course',
        select: 'title slug thumbnail category level duration price rating enrolledCount',
        populate: { path: 'teacher', select: 'name avatar' },
      }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const enrollments = await features.query;
  const total = await Enrollment.countDocuments({ student: req.user._id });
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { enrollments }, pagination);
});

const getCourseEnrollments = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError('Course');
  }

  if (req.user.role !== 'admin' && course.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only view enrollments for your own courses');
  }

  const features = new APIFeatures(
    Enrollment.find({ course: courseId })
      .populate('student', 'name email avatar phone'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const enrollments = await features.query;
  const total = await Enrollment.countDocuments({ course: courseId });
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { enrollments }, pagination);
});

const updateProgress = asyncHandler(async (req, res) => {
  const { completedLectures } = req.body;

  const enrollment = await Enrollment.findOne({
    student: req.user._id,
    course: req.params.courseId,
    status: 'active',
  });

  if (!enrollment) {
    throw new NotFoundError('Active enrollment');
  }

  enrollment.progress.completedLectures = completedLectures;
  enrollment.progress.totalLectures = enrollment.progress.totalLectures || completedLectures;
  enrollment.progress.percentage = enrollment.progress.totalLectures > 0
    ? Math.round((completedLectures / enrollment.progress.totalLectures) * 100)
    : 0;
  enrollment.progress.lastAccessed = new Date();

  await enrollment.save();

  sendResponse(res, 200, { enrollment }, 'Progress updated');
});

const completeCourse = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findOne({
    student: req.user._id,
    course: req.params.courseId,
    status: 'active',
  });

  if (!enrollment) {
    throw new NotFoundError('Active enrollment');
  }

  enrollment.status = 'completed';
  enrollment.progress.percentage = 100;
  enrollment.progress.completedLectures = enrollment.progress.totalLectures;
  enrollment.completionDate = new Date();

  await enrollment.save();

  sendResponse(res, 200, { enrollment }, 'Course completed successfully');
});

const cancelEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findOne({
    student: req.user._id,
    course: req.params.courseId,
    status: 'active',
  });

  if (!enrollment) {
    throw new NotFoundError('Active enrollment');
  }

  enrollment.status = 'cancelled';
  await enrollment.save();

  await Course.findByIdAndUpdate(req.params.courseId, { $inc: { enrolledCount: -1 } });

  sendResponse(res, 200, { enrollment }, 'Enrollment cancelled');
});

module.exports = {
  enrollCourse,
  getUserEnrollments,
  getCourseEnrollments,
  updateProgress,
  completeCourse,
  cancelEnrollment,
};
