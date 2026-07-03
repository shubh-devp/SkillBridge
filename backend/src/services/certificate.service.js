const { Certificate, User, Course, Enrollment } = require('../models');
const { generateCertificateId, AppError, NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');

const issueCertificate = async (studentId, courseId, enrollmentId, grade, percentage) => {
  const student = await User.findById(studentId);
  if (!student) {
    throw new NotFoundError('Student');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError('Course');
  }

  const enrollment = await Enrollment.findById(enrollmentId);
  if (!enrollment) {
    throw new NotFoundError('Enrollment');
  }

  if (enrollment.student.toString() !== studentId) {
    throw new AppError('Enrollment does not belong to this student', 400);
  }

  const existingCert = await Certificate.findOne({ student: studentId, course: courseId });
  if (existingCert) {
    throw new AppError('Certificate already issued for this course', 409);
  }

  const certificate = await Certificate.create({
    student: studentId,
    course: courseId,
    enrollment: enrollmentId,
    certificateId: generateCertificateId(),
    issueDate: new Date(),
    grade,
    percentage,
    isVerified: true,
  });

  enrollment.certificateIssued = true;
  enrollment.certificateUrl = certificate.certificateId;
  await enrollment.save();

  logger.info(`Certificate issued: ${certificate.certificateId} for student ${studentId}`);

  return certificate;
};

const verifyCertificate = async (certificateId) => {
  const certificate = await Certificate.findOne({ certificateId })
    .populate('student', 'name email')
    .populate('course', 'title category')
    .populate('enrollment', 'completionDate');

  if (!certificate) {
    throw new NotFoundError('Certificate');
  }

  return {
    isValid: true,
    certificateId: certificate.certificateId,
    studentName: certificate.student?.name,
    courseName: certificate.course?.title,
    category: certificate.course?.category,
    issueDate: certificate.issueDate,
    grade: certificate.grade,
    percentage: certificate.percentage,
  };
};

module.exports = {
  generateCertificateId,
  issueCertificate,
  verifyCertificate,
};
