const { Course, User } = require('../models');
const { AppError, NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getCourses = asyncHandler(async (req, res) => {
  const filter = { isPublished: true };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.level) filter.level = req.query.level;

  const features = new APIFeatures(Course.find(filter).populate('teacher', 'name email avatar'), req.query)
    .search(['title', 'description.short'])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const courses = await features.query;
  const total = await Course.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { courses }, pagination);
});

const getCourseBySlug = asyncHandler(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
    .populate('teacher', 'name email avatar bio')
    .populate('batch', 'name startDate status');

  if (!course) {
    throw new NotFoundError('Course');
  }

  sendResponse(res, 200, { course });
});

const getFeaturedCourses = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 6;

  const courses = await Course.find({ isPublished: true, isFeatured: true })
    .populate('teacher', 'name email avatar')
    .sort('-rating.average')
    .limit(limit);

  sendResponse(res, 200, { courses });
});

const createCourse = asyncHandler(async (req, res) => {
  const teacherId = req.user.role === 'admin' ? req.body.teacher || req.user._id : req.user._id;

  if (req.user.role === 'teacher') {
    const teacher = await User.findById(req.user._id);
    if (!teacher || teacher.role !== 'teacher') {
      throw new ForbiddenError('Only teachers can create courses');
    }
  }

  const course = await Course.create({
    ...req.body,
    teacher: teacherId,
  });

  await course.populate('teacher', 'name email avatar');

  sendResponse(res, 201, { course }, 'Course created successfully');
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    throw new NotFoundError('Course');
  }

  if (req.user.role !== 'admin' && course.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only update your own courses');
  }

  Object.assign(course, req.body);
  await course.save();

  await course.populate('teacher', 'name email avatar');

  sendResponse(res, 200, { course }, 'Course updated successfully');
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    throw new NotFoundError('Course');
  }

  await course.deleteOne();

  sendResponse(res, 200, {}, 'Course deleted successfully');
});

const getCoursesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const validCategories = [
    'JEE Advanced', 'JEE Main', 'NEET', 'CBSE', 'ICSE',
    'State Board', 'Programming', 'Competitive Exams', 'Skill Development', 'Other',
  ];

  if (!validCategories.includes(category)) {
    throw new AppError('Invalid category', 400);
  }

  const features = new APIFeatures(
    Course.find({ category, isPublished: true }).populate('teacher', 'name email avatar'),
    req.query
  )
    .search(['title', 'description.short'])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const courses = await features.query;
  const total = await Course.countDocuments({ category, isPublished: true });
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { courses }, pagination);
});

module.exports = {
  getCourses,
  getCourseBySlug,
  getFeaturedCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByCategory,
};
