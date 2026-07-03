const { Batch, Course } = require('../models');
const { NotFoundError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getBatches = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.course) filter.course = req.query.course;

  const features = new APIFeatures(
    Batch.find(filter)
      .populate('course', 'title slug category')
      .populate('teacher', 'name email avatar'),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const batches = await features.query;
  const total = await Batch.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { batches }, pagination);
});

const getBatchById = asyncHandler(async (req, res) => {
  const batch = await Batch.findById(req.params.id)
    .populate('course', 'title slug category description price')
    .populate('teacher', 'name email avatar bio');

  if (!batch) {
    throw new NotFoundError('Batch');
  }

  const studentCount = batch.enrolledCount;
  const seatsAvailable = batch.maxStudents - studentCount;

  sendResponse(res, 200, { batch, seatsAvailable: Math.max(0, seatsAvailable) });
});

const getUpcomingBatches = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 6;

  const batches = await Batch.find({ status: 'upcoming' })
    .populate('course', 'title slug category')
    .populate('teacher', 'name email avatar')
    .sort('startDate')
    .limit(limit);

  sendResponse(res, 200, { batches });
});

const createBatch = asyncHandler(async (req, res) => {
  const batch = await Batch.create(req.body);

  await batch.populate([
    { path: 'course', select: 'title slug category' },
    { path: 'teacher', select: 'name email avatar' },
  ]);

  sendResponse(res, 201, { batch }, 'Batch created successfully');
});

const updateBatch = asyncHandler(async (req, res) => {
  const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate([
    { path: 'course', select: 'title slug category' },
    { path: 'teacher', select: 'name email avatar' },
  ]);

  if (!batch) {
    throw new NotFoundError('Batch');
  }

  sendResponse(res, 200, { batch }, 'Batch updated successfully');
});

const deleteBatch = asyncHandler(async (req, res) => {
  const batch = await Batch.findById(req.params.id);
  if (!batch) {
    throw new NotFoundError('Batch');
  }

  await batch.deleteOne();

  sendResponse(res, 200, {}, 'Batch deleted successfully');
});

module.exports = {
  getBatches,
  getBatchById,
  getUpcomingBatches,
  createBatch,
  updateBatch,
  deleteBatch,
};
