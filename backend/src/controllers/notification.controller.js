const { Notification } = require('../models');
const { NotFoundError, asyncHandler } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const getNotifications = asyncHandler(async (req, res) => {
  const filter = { recipient: req.user._id, isArchived: false };

  const features = new APIFeatures(Notification.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const notifications = await features.query;
  const total = await Notification.countDocuments(filter);
  const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false, isArchived: false });
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { notifications, unreadCount }, pagination);
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new NotFoundError('Notification');
  }

  sendResponse(res, 200, { notification }, 'Marked as read');
});

const markAllAsRead = asyncHandler(async (req, res) => {
  const result = await Notification.updateMany(
    { recipient: req.user._id, isRead: false },
    { isRead: true }
  );

  sendResponse(res, 200, { modifiedCount: result.modifiedCount }, 'All notifications marked as read');
});

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndDelete({
    _id: req.params.id,
    recipient: req.user._id,
  });

  if (!notification) {
    throw new NotFoundError('Notification');
  }

  sendResponse(res, 200, {}, 'Notification deleted');
});

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
