const { Notification, User } = require('../models');
const logger = require('../utils/logger');

const createNotification = async (recipientId, type, title, message, link = null) => {
  const validTypes = ['course', 'enrollment', 'assignment', 'test', 'certificate', 'payment', 'system'];
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid notification type: ${type}`);
  }

  const notification = await Notification.create({
    recipient: recipientId,
    type,
    title,
    message,
    link,
  });

  return notification;
};

const notifyEnrollment = async (studentId, courseName) => {
  return createNotification(
    studentId,
    'enrollment',
    'Enrollment Successful',
    `You have successfully enrolled in ${courseName}.`,
    '/dashboard/my-courses'
  );
};

const notifyAssignment = async (students, assignmentTitle) => {
  if (!Array.isArray(students) || students.length === 0) {
    return [];
  }

  const notifications = [];
  for (const studentId of students) {
    const notification = await createNotification(
      studentId,
      'assignment',
      'New Assignment',
      `A new assignment "${assignmentTitle}" has been posted.`,
      '/dashboard/assignments'
    );
    notifications.push(notification);
  }

  return notifications;
};

const notifyTestResult = async (studentId, testTitle, score) => {
  return createNotification(
    studentId,
    'test',
    'Test Result Available',
    `Your score for "${testTitle}" is ${score}.`,
    '/dashboard/tests'
  );
};

const notifyCertificate = async (studentId, courseName) => {
  return createNotification(
    studentId,
    'certificate',
    'Certificate Issued',
    `Congratulations! Your certificate for ${courseName} has been issued.`,
    '/dashboard/certificates'
  );
};

module.exports = {
  createNotification,
  notifyEnrollment,
  notifyAssignment,
  notifyTestResult,
  notifyCertificate,
};
