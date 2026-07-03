const { User, Course, Enrollment, Test, TestResult, Assignment, AssignmentSubmission, Notification, Blog, Batch, Contact } = require('../models');
const { asyncHandler } = require('../utils/errors');
const { sendResponse } = require('../utils/response');

const getStudentDashboard = asyncHandler(async (req, res) => {
  const studentId = req.user._id;

  const enrollments = await Enrollment.find({ student: studentId })
    .populate({
      path: 'course',
      select: 'title slug thumbnail category level duration rating enrolledCount teacher',
      populate: { path: 'teacher', select: 'name avatar' },
    })
    .sort('-updatedAt');

  const enrolledCourseIds = enrollments.map((e) => e.course?._id).filter(Boolean);

  const activeEnrollments = enrollments.filter((e) => e.status === 'active');
  const completedEnrollments = enrollments.filter((e) => e.status === 'completed');
  const overallProgress = activeEnrollments.length > 0
    ? Math.round(activeEnrollments.reduce((sum, e) => sum + e.progress.percentage, 0) / activeEnrollments.length)
    : 0;

  const tests = await Test.find({
    course: { $in: enrolledCourseIds },
    isPublished: true,
    deadlineDate: { $gte: new Date() },
  })
    .select('title type duration totalMarks scheduledDate deadlineDate course')
    .populate('course', 'title slug')
    .sort('scheduledDate')
    .limit(5);

  const today = new Date();
  const assignedAssignments = await Assignment.find({
    course: { $in: enrolledCourseIds },
    isPublished: true,
  })
    .select('title dueDate totalMarks course')
    .populate('course', 'title slug')
    .sort('dueDate');

  const submissionRecords = await AssignmentSubmission.find({
    student: studentId,
    assignment: { $in: assignedAssignments.map((a) => a._id) },
  }).select('assignment status grade');

  const submittedMap = {};
  submissionRecords.forEach((s) => {
    submittedMap[s.assignment.toString()] = s;
  });

  const pendingAssignments = assignedAssignments.filter((a) => {
    const sub = submittedMap[a._id.toString()];
    return !sub || sub.status === 'resubmitted';
  }).slice(0, 5);

  let totalScore = 0;
  let gradedCount = 0;
  submissionRecords.forEach((s) => {
    if (s.status === 'graded' && s.grade?.marksObtained !== undefined) {
      totalScore += s.grade.marksObtained;
      gradedCount++;
    }
  });
  const averageScore = gradedCount > 0 ? Math.round(totalScore / gradedCount) : 0;

  const testResults = await TestResult.find({ student: studentId });
  const testsAttempted = testResults.length;
  const testsPassed = testResults.filter((r) => r.isPassed).length;

  const recentNotifications = await Notification.find({ recipient: studentId, isArchived: false })
    .sort('-createdAt')
    .limit(5);

  sendResponse(res, 200, {
    dashboard: {
      stats: {
        totalEnrollments: enrollments.length,
        activeEnrollments: activeEnrollments.length,
        completedEnrollments: completedEnrollments.length,
        overallProgress,
        testsAttempted,
        testsPassed,
        averageScore,
      },
      enrollments,
      upcomingTests: tests,
      pendingAssignments,
      recentNotifications,
    },
  });
});

const getTeacherDashboard = asyncHandler(async (req, res) => {
  const teacherId = req.user._id;

  const courses = await Course.find({ teacher: teacherId })
    .select('title slug category level isPublished enrolledCount rating price')
    .sort('-createdAt');

  const courseIds = courses.map((c) => c._id);

  const totalStudents = await Enrollment.distinct('student', {
    course: { $in: courseIds },
    status: { $in: ['active', 'completed'] },
  });

  const recentSubmissions = await AssignmentSubmission.find({
    assignment: { $in: await Assignment.find({ teacher: teacherId }).select('_id') },
    status: 'submitted',
  })
    .populate('student', 'name email avatar')
    .populate({
      path: 'assignment',
      select: 'title totalMarks dueDate',
    })
    .sort('-submittedAt')
    .limit(10);

  const totalEnrollments = await Enrollment.countDocuments({ course: { $in: courseIds } });
  const activeEnrollments = await Enrollment.countDocuments({
    course: { $in: courseIds },
    status: 'active',
  });

  const publishedCourses = courses.filter((c) => c.isPublished).length;
  const totalTests = await Test.countDocuments({ teacher: teacherId });
  const totalAssignments = await Assignment.countDocuments({ teacher: teacherId });

  const recentNotifications = await Notification.find({ recipient: teacherId, isArchived: false })
    .sort('-createdAt')
    .limit(5);

  sendResponse(res, 200, {
    dashboard: {
      stats: {
        totalCourses: courses.length,
        publishedCourses,
        totalStudents: totalStudents.length,
        totalEnrollments,
        activeEnrollments,
        totalTests,
        totalAssignments,
      },
      courses,
      recentSubmissions,
      recentNotifications,
    },
  });
});

const getAdminDashboard = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalTeachers = await User.countDocuments({ role: 'teacher' });
  const totalAdmins = await User.countDocuments({ role: 'admin' });
  const activeUsers = await User.countDocuments({ isActive: true });

  const totalCourses = await Course.countDocuments();
  const publishedCourses = await Course.countDocuments({ isPublished: true });
  const featuredCourses = await Course.countDocuments({ isFeatured: true });

  const totalEnrollments = await Enrollment.countDocuments();
  const activeEnrollments = await Enrollment.countDocuments({ status: 'active' });
  const completedEnrollments = await Enrollment.countDocuments({ status: 'completed' });

  const revenueData = await Enrollment.aggregate([
    { $match: { 'paymentInfo.status': 'completed' } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$paymentInfo.amount' },
        avgOrderValue: { $avg: '$paymentInfo.amount' },
      },
    },
  ]);
  const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
  const avgOrderValue = revenueData.length > 0 ? Math.round(revenueData[0].avgOrderValue) : 0;

  const monthlyRevenue = await Enrollment.aggregate([
    { $match: { 'paymentInfo.status': 'completed' } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        revenue: { $sum: '$paymentInfo.amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 12 },
  ]);

  const totalBlogs = await Blog.countDocuments();
  const totalBatches = await Batch.countDocuments();
  const totalContacts = await Contact.countDocuments({ status: 'new' });

  const recentEnrollments = await Enrollment.find()
    .populate('student', 'name email')
    .populate('course', 'title slug')
    .sort('-createdAt')
    .limit(10);

  const recentUsers = await User.find()
    .select('name email role isActive createdAt')
    .sort('-createdAt')
    .limit(10);

  sendResponse(res, 200, {
    dashboard: {
      stats: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalAdmins,
        activeUsers,
        totalCourses,
        publishedCourses,
        featuredCourses,
        totalEnrollments,
        activeEnrollments,
        completedEnrollments,
        totalRevenue,
        avgOrderValue,
        totalBlogs,
        totalBatches,
        pendingContacts: totalContacts,
      },
      monthlyRevenue,
      recentEnrollments,
      recentUsers,
    },
  });
});

module.exports = {
  getStudentDashboard,
  getTeacherDashboard,
  getAdminDashboard,
};
