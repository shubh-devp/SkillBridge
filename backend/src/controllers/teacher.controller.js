const { User, Course } = require('../models');
const { NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getTeachers = asyncHandler(async (req, res) => {
  const filter = { role: 'teacher', isActive: true };

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filter.$or = [{ name: searchRegex }, { email: searchRegex }, { bio: searchRegex }];
  }

  const features = new APIFeatures(User.find(filter).select('-password -refreshToken'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const teachers = await features.query;

  let teacherIds = teachers.map((t) => t._id);

  let categoryFilter = {};
  if (req.query.category) {
    categoryFilter.category = req.query.category;
  }

  const courseCounts = await Course.aggregate([
    { $match: { teacher: { $in: teacherIds }, ...categoryFilter } },
    { $group: { _id: '$teacher', count: { $sum: 1 } } },
  ]);

  const countMap = {};
  courseCounts.forEach((c) => {
    countMap[c._id.toString()] = c.count;
  });

  const enrichedTeachers = teachers.map((t) => ({
    ...t.toObject(),
    courseCount: countMap[t._id.toString()] || 0,
  }));

  const total = await User.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { teachers: enrichedTeachers }, pagination);
});

const getTeacherBySlug = asyncHandler(async (req, res) => {
  const teacher = await User.findOne({
    _id: req.params.id,
    role: 'teacher',
    isActive: true,
  }).select('-password -refreshToken');

  if (!teacher) {
    throw new NotFoundError('Teacher');
  }

  const courseCount = await Course.countDocuments({ teacher: teacher._id, isPublished: true });

  sendResponse(res, 200, { teacher: { ...teacher.toObject(), courseCount } });
});

const getTeacherCourses = asyncHandler(async (req, res) => {
  const teacherId = req.params.id || req.user._id;

  const teacher = await User.findById(teacherId);
  if (!teacher || teacher.role !== 'teacher') {
    throw new NotFoundError('Teacher');
  }

  const features = new APIFeatures(
    Course.find({ teacher: teacherId }).populate('teacher', 'name email avatar'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const courses = await features.query;
  const total = await Course.countDocuments({ teacher: teacherId });
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { courses }, pagination);
});

const updateTeacherProfile = asyncHandler(async (req, res) => {
  if (req.user.role !== 'teacher') {
    throw new ForbiddenError('Only teachers can update teacher profile');
  }

  const allowedFields = ['name', 'bio', 'avatar', 'phone'];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const teacher = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select('-password -refreshToken');

  if (!teacher) {
    throw new NotFoundError('Teacher');
  }

  sendResponse(res, 200, { teacher }, 'Profile updated successfully');
});

module.exports = {
  getTeachers,
  getTeacherBySlug,
  getTeacherCourses,
  updateTeacherProfile,
};
