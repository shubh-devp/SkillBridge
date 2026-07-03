const { Blog } = require('../models');
const { AppError, NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getBlogs = asyncHandler(async (req, res) => {
  const filter = { isPublished: true };
  if (req.query.category) filter.category = req.query.category;

  const features = new APIFeatures(Blog.find(filter).populate('author', 'name avatar'), req.query)
    .search(['title', 'content', 'excerpt'])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const blogs = await features.query;
  const total = await Blog.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { blogs }, pagination);
});

const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name avatar bio');

  if (!blog) {
    throw new NotFoundError('Blog');
  }

  if (!blog.isPublished && (!req.user || (req.user._id.toString() !== blog.author._id.toString() && req.user.role !== 'admin'))) {
    throw new NotFoundError('Blog');
  }

  blog.views += 1;
  await blog.save({ validateBeforeSave: false });

  sendResponse(res, 200, { blog });
});

const getFeaturedBlogs = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 4;

  const blogs = await Blog.find({ isPublished: true, isFeatured: true })
    .populate('author', 'name avatar')
    .sort('-createdAt')
    .limit(limit);

  sendResponse(res, 200, { blogs });
});

const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user._id,
    publishedAt: req.body.isPublished ? new Date() : undefined,
  });

  await blog.populate('author', 'name avatar');

  sendResponse(res, 201, { blog }, 'Blog created successfully');
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new NotFoundError('Blog');
  }

  if (req.user.role !== 'admin' && blog.author.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only update your own blogs');
  }

  const wasPublished = blog.isPublished;
  Object.assign(blog, req.body);

  if (!wasPublished && blog.isPublished) {
    blog.publishedAt = new Date();
  }

  await blog.save();
  await blog.populate('author', 'name avatar');

  sendResponse(res, 200, { blog }, 'Blog updated successfully');
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new NotFoundError('Blog');
  }

  if (req.user.role !== 'admin' && blog.author.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only delete your own blogs');
  }

  await blog.deleteOne();

  sendResponse(res, 200, {}, 'Blog deleted successfully');
});

const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    throw new NotFoundError('Blog');
  }

  const userId = req.user._id;
  const alreadyLiked = blog.likes.some((id) => id.toString() === userId.toString());

  if (alreadyLiked) {
    blog.likes.pull(userId);
  } else {
    blog.likes.push(userId);
  }

  await blog.save();

  sendResponse(res, 200, {
    likes: blog.likes,
    likesCount: blog.likes.length,
    isLiked: !alreadyLiked,
  }, alreadyLiked ? 'Blog unliked' : 'Blog liked');
});

module.exports = {
  getBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
};
