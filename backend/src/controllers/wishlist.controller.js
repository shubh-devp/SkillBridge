const { Wishlist, Course } = require('../models');
const { AppError, NotFoundError, asyncHandler } = require('../utils/errors');
const { sendResponse } = require('../utils/response');

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({ student: req.user._id })
    .populate({
      path: 'course',
      select: 'title slug thumbnail price rating enrolledCount category teacher duration level',
      populate: { path: 'teacher', select: 'name avatar' },
    })
    .sort('-createdAt');

  sendResponse(res, 200, { wishlist });
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    throw new AppError('Course ID is required', 400);
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError('Course');
  }

  const existing = await Wishlist.findOne({
    student: req.user._id,
    course: courseId,
  });

  if (existing) {
    throw new AppError('Course already in wishlist', 400);
  }

  const item = await Wishlist.create({
    student: req.user._id,
    course: courseId,
  });

  await item.populate({
    path: 'course',
    select: 'title slug thumbnail price rating enrolledCount teacher',
    populate: { path: 'teacher', select: 'name avatar' },
  });

  sendResponse(res, 201, { wishlist: item }, 'Added to wishlist');
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const item = await Wishlist.findOneAndDelete({
    _id: req.params.id,
    student: req.user._id,
  });

  if (!item) {
    throw new NotFoundError('Wishlist item');
  }

  sendResponse(res, 200, {}, 'Removed from wishlist');
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
