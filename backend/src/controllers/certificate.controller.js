const { Certificate, Enrollment } = require('../models');
const { AppError, NotFoundError, ForbiddenError, asyncHandler, generateCertificateId } = require('../utils/errors');
const { sendResponse, sendPaginatedResponse } = require('../utils/response');
const APIFeatures = require('../utils/apiFeatures');

const generateCertificate = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.body;

  if (!enrollmentId) {
    throw new AppError('Enrollment ID is required', 400);
  }

  const enrollment = await Enrollment.findById(enrollmentId)
    .populate('student', 'name email')
    .populate('course', 'title');

  if (!enrollment) {
    throw new NotFoundError('Enrollment');
  }

  if (enrollment.status !== 'completed') {
    throw new AppError('Course must be completed before issuing a certificate', 400);
  }

  const existing = await Certificate.findOne({ enrollment: enrollmentId });
  if (existing) {
    throw new AppError('Certificate already issued for this enrollment', 400);
  }

  const percentage = enrollment.progress.percentage;
  let grade = 'C';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B+';
  else if (percentage >= 60) grade = 'B';

  const certificate = await Certificate.create({
    student: enrollment.student._id,
    course: enrollment.course._id,
    enrollment: enrollment._id,
    certificateId: generateCertificateId(),
    grade,
    percentage,
    issueDate: new Date(),
  });

  enrollment.certificateIssued = true;
  await enrollment.save();

  await certificate.populate([
    { path: 'student', select: 'name email' },
    { path: 'course', select: 'title slug' },
  ]);

  sendResponse(res, 201, { certificate }, 'Certificate generated successfully');
});

const getUserCertificates = asyncHandler(async (req, res) => {
  const filter = { student: req.user._id };

  const features = new APIFeatures(
    Certificate.find(filter)
      .populate('course', 'title slug category')
      .populate('enrollment', 'completionDate progress')
      .sort('-issueDate'),
    req.query
  )
    .limitFields()
    .paginate();

  const certificates = await features.query;
  const total = await Certificate.countDocuments(filter);
  const pagination = features.getPaginationInfo(total);

  sendPaginatedResponse(res, 200, { certificates }, pagination);
});

const verifyCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;

  if (!certificateId) {
    throw new AppError('Certificate ID is required', 400);
  }

  const certificate = await Certificate.findOne({ certificateId })
    .populate('student', 'name')
    .populate('course', 'title category duration');

  if (!certificate) {
    throw new NotFoundError('Certificate');
  }

  sendResponse(res, 200, {
    isValid: true,
    certificate: {
      certificateId: certificate.certificateId,
      studentName: certificate.student.name,
      courseTitle: certificate.course.title,
      category: certificate.course.category,
      issueDate: certificate.issueDate,
      grade: certificate.grade,
      percentage: certificate.percentage,
    },
  });
});

module.exports = {
  generateCertificate,
  getUserCertificates,
  verifyCertificate,
};
