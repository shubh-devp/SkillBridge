const { User, Course, Enrollment, TestResult, AssignmentSubmission, Review } = require('../models');
const { NotFoundError, ForbiddenError, asyncHandler } = require('../utils/errors');
const { sendResponse } = require('../utils/response');

const getCourseAnalytics = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;

  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError('Course');
  }

  if (req.user.role !== 'admin' && course.teacher.toString() !== req.user._id.toString()) {
    throw new ForbiddenError('You can only view analytics for your own courses');
  }

  const totalEnrollments = await Enrollment.countDocuments({ course: courseId });
  const activeEnrollments = await Enrollment.countDocuments({ course: courseId, status: 'active' });
  const completedEnrollments = await Enrollment.countDocuments({ course: courseId, status: 'completed' });
  const cancelledEnrollments = await Enrollment.countDocuments({ course: courseId, status: 'cancelled' });

  const revenueResult = await Enrollment.aggregate([
    { $match: { course: course._id, 'paymentInfo.status': 'completed' } },
    {
      $group: {
        _id: null,
        total: { $sum: '$paymentInfo.amount' },
        count: { $sum: 1 },
      },
    },
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  const enrollmentTrend = await Enrollment.aggregate([
    { $match: { course: course._id } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 },
  ]);

  const testResults = await TestResult.aggregate([
    {
      $lookup: {
        from: 'tests',
        localField: 'test',
        foreignField: '_id',
        as: 'test',
      },
    },
    { $unwind: '$test' },
    { $match: { 'test.course': course._id } },
    {
      $group: {
        _id: null,
        averageScore: { $avg: '$percentage' },
        passRate: {
          $avg: { $cond: ['$isPassed', 1, 0] },
        },
        totalAttempts: { $sum: 1 },
      },
    },
  ]);

  const submissionStats = await AssignmentSubmission.aggregate([
    {
      $lookup: {
        from: 'assignments',
        localField: 'assignment',
        foreignField: '_id',
        as: 'assignment',
      },
    },
    { $unwind: '$assignment' },
    { $match: { 'assignment.course': course._id } },
    {
      $group: {
        _id: null,
        totalSubmissions: { $sum: 1 },
        gradedCount: {
          $sum: { $cond: [{ $eq: ['$status', 'graded'] }, 1, 0] },
        },
        averageMarks: { $avg: '$grade.marksObtained' },
      },
    },
  ]);

  const reviewStats = await Review.aggregate([
    { $match: { course: course._id, isApproved: true } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        distribution: {
          $push: '$rating',
        },
      },
    },
  ]);

  let ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (reviewStats.length > 0 && reviewStats[0].distribution) {
    reviewStats[0].distribution.forEach((r) => {
      if (ratingDistribution[r] !== undefined) {
        ratingDistribution[r]++;
      }
    });
  }

  sendResponse(res, 200, {
    analytics: {
      course: {
        _id: course._id,
        title: course.title,
        slug: course.slug,
        category: course.category,
      },
      enrollments: {
        total: totalEnrollments,
        active: activeEnrollments,
        completed: completedEnrollments,
        cancelled: cancelledEnrollments,
        completionRate: totalEnrollments > 0
          ? Math.round((completedEnrollments / totalEnrollments) * 100)
          : 0,
      },
      revenue: {
        total: totalRevenue,
        averagePerStudent: totalEnrollments > 0
          ? Math.round(totalRevenue / totalEnrollments)
          : 0,
      },
      tests: testResults.length > 0 ? {
        averageScore: Math.round(testResults[0].averageScore * 100) / 100,
        passRate: Math.round(testResults[0].passRate * 100),
        totalAttempts: testResults[0].totalAttempts,
      } : null,
      assignments: submissionStats.length > 0 ? {
        totalSubmissions: submissionStats[0].totalSubmissions,
        gradedCount: submissionStats[0].gradedCount,
        averageMarks: Math.round(submissionStats[0].averageMarks * 100) / 100,
      } : null,
      reviews: {
        averageRating: reviewStats.length > 0
          ? Math.round(reviewStats[0].averageRating * 10) / 10
          : 0,
        totalReviews: reviewStats.length > 0 ? reviewStats[0].totalReviews : 0,
        distribution: ratingDistribution,
      },
      trends: {
        enrollmentTrend,
      },
    },
  });
});

const getUserAnalytics = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ForbiddenError('Only admins can view user analytics');
  }

  const totalUsers = await User.countDocuments();

  const roleDistribution = await User.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
  ]);

  const registrationTrend = await User.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 },
  ]);

  const activeVsInactive = await User.aggregate([
    {
      $group: {
        _id: '$isActive',
        count: { $sum: 1 },
      },
    },
  ]);

  const verifiedUsers = await User.countDocuments({ isVerified: true });

  const enrollmentStats = await Enrollment.aggregate([
    {
      $group: {
        _id: '$student',
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        avgEnrollmentsPerUser: { $avg: '$count' },
        maxEnrollments: { $max: '$count' },
        usersWithEnrollments: { $sum: 1 },
      },
    },
  ]);

  sendResponse(res, 200, {
    analytics: {
      totalUsers,
      verifiedUsers,
      verificationRate: totalUsers > 0
        ? Math.round((verifiedUsers / totalUsers) * 100)
        : 0,
      roleDistribution: roleDistribution.map((r) => ({
        role: r._id,
        count: r.count,
      })),
      activeVsInactive: activeVsInactive.map((r) => ({
        status: r._id ? 'active' : 'inactive',
        count: r.count,
      })),
      registrationTrend,
      engagement: enrollmentStats.length > 0 ? {
        averageEnrollmentsPerUser: Math.round(enrollmentStats[0].avgEnrollmentsPerUser * 100) / 100,
        usersWithEnrollments: enrollmentStats[0].usersWithEnrollments,
        enrollmentRate: totalUsers > 0
          ? Math.round((enrollmentStats[0].usersWithEnrollments / totalUsers) * 100)
          : 0,
      } : null,
    },
  });
});

const getRevenueAnalytics = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ForbiddenError('Only admins can view revenue analytics');
  }

  const dateFilter = {};
  if (req.query.startDate) {
    dateFilter.$gte = new Date(req.query.startDate);
  }
  if (req.query.endDate) {
    dateFilter.$lte = new Date(req.query.endDate);
  }

  const matchStage = { 'paymentInfo.status': 'completed' };
  if (Object.keys(dateFilter).length > 0) {
    matchStage.createdAt = dateFilter;
  }

  const totalRevenueResult = await Enrollment.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$paymentInfo.amount' },
        totalTransactions: { $sum: 1 },
        averageOrderValue: { $avg: '$paymentInfo.amount' },
      },
    },
  ]);

  const monthlyRevenue = await Enrollment.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        revenue: { $sum: '$paymentInfo.amount' },
        transactions: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 },
  ]);

  const revenueByCategory = await Enrollment.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    { $unwind: '$course' },
    {
      $group: {
        _id: '$course.category',
        revenue: { $sum: '$paymentInfo.amount' },
        transactions: { $sum: 1 },
      },
    },
    { $sort: { revenue: -1 } },
  ]);

  const revenueByCourse = await Enrollment.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    { $unwind: '$course' },
    {
      $group: {
        _id: { title: '$course.title', slug: '$course.slug' },
        revenue: { $sum: '$paymentInfo.amount' },
        transactions: { $sum: 1 },
      },
    },
    { $sort: { revenue: -1 } },
    { $limit: 10 },
  ]);

  const refundData = await Enrollment.aggregate([
    { $match: { 'paymentInfo.status': 'refunded' } },
    {
      $group: {
        _id: null,
        totalRefunds: { $sum: '$paymentInfo.amount' },
        refundCount: { $sum: 1 },
      },
    },
  ]);

  const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;
  const totalRefunds = refundData.length > 0 ? refundData[0].totalRefunds : 0;

  sendResponse(res, 200, {
    analytics: {
      summary: {
        totalRevenue,
        totalRefunds,
        netRevenue: totalRevenue - totalRefunds,
        totalTransactions: totalRevenueResult.length > 0 ? totalRevenueResult[0].totalTransactions : 0,
        averageOrderValue: totalRevenueResult.length > 0
          ? Math.round(totalRevenueResult[0].averageOrderValue)
          : 0,
        refundRate: totalRevenue > 0
          ? Math.round((totalRefunds / totalRevenue) * 100)
          : 0,
      },
      monthlyRevenue,
      revenueByCategory,
      topCourses: revenueByCourse,
    },
  });
});

module.exports = {
  getCourseAnalytics,
  getUserAnalytics,
  getRevenueAnalytics,
};
