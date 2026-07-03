const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, notificationController.getNotifications);
router.patch('/read-all', authenticate, notificationController.markAllAsRead);
router.patch('/:id/read', authenticate, notificationController.markAsRead);
router.delete('/:id', authenticate, notificationController.deleteNotification);

module.exports = router;
