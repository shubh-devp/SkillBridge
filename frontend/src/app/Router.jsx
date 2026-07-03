import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from '@/components/shared/LoadingSpinner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));

const Home = lazy(() => import('@/pages/Home'));
const Courses = lazy(() => import('@/pages/Courses'));
const CourseDetails = lazy(() => import('@/pages/CourseDetails'));
const Teachers = lazy(() => import('@/pages/Teachers'));
const TeacherDetails = lazy(() => import('@/pages/TeacherDetails'));
const About = lazy(() => import('@/pages/About'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));

const StudentDashboard = lazy(() => import('@/pages/dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('@/pages/dashboard/TeacherDashboard'));
const AdminDashboard = lazy(() => import('@/pages/dashboard/AdminDashboard'));
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'));

const StudentCourses = lazy(() => import('@/pages/dashboard/StudentCourses'));
const StudentWishlist = lazy(() => import('@/pages/dashboard/StudentWishlist'));
const StudentTests = lazy(() => import('@/pages/dashboard/StudentTests'));
const StudentAssignments = lazy(() => import('@/pages/dashboard/StudentAssignments'));
const StudentCertificates = lazy(() => import('@/pages/dashboard/StudentCertificates'));

const TeacherCourses = lazy(() => import('@/pages/dashboard/TeacherCourses'));
const TeacherStudents = lazy(() => import('@/pages/dashboard/TeacherStudents'));
const TeacherTests = lazy(() => import('@/pages/dashboard/TeacherTests'));
const TeacherAssignments = lazy(() => import('@/pages/dashboard/TeacherAssignments'));
const TeacherAnalytics = lazy(() => import('@/pages/dashboard/TeacherAnalytics'));

const AdminUsers = lazy(() => import('@/pages/dashboard/AdminUsers'));
const AdminCourses = lazy(() => import('@/pages/dashboard/AdminCourses'));
const AdminTeachers = lazy(() => import('@/pages/dashboard/AdminTeachers'));
const AdminBlogs = lazy(() => import('@/pages/dashboard/AdminBlogs'));
const AdminMessages = lazy(() => import('@/pages/dashboard/AdminMessages'));
const AdminAnalytics = lazy(() => import('@/pages/dashboard/AdminAnalytics'));
const AdminSettings = lazy(() => import('@/pages/dashboard/AdminSettings'));

const DashboardRedirect = lazy(() => import('@/components/auth/DashboardRedirect'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner className="w-8 h-8" />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/:id" element={<TeacherDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardRedirect />} />

          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/courses" element={<StudentCourses />} />
          <Route path="student/wishlist" element={<StudentWishlist />} />
          <Route path="student/tests" element={<StudentTests />} />
          <Route path="student/assignments" element={<StudentAssignments />} />
          <Route path="student/certificates" element={<StudentCertificates />} />
          <Route path="student/profile" element={<Navigate to="/dashboard/profile" replace />} />

          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="teacher/courses" element={<TeacherCourses />} />
          <Route path="teacher/students" element={<TeacherStudents />} />
          <Route path="teacher/tests" element={<TeacherTests />} />
          <Route path="teacher/assignments" element={<TeacherAssignments />} />
          <Route path="teacher/analytics" element={<TeacherAnalytics />} />
          <Route path="teacher/profile" element={<Navigate to="/dashboard/profile" replace />} />

          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/courses" element={<AdminCourses />} />
          <Route path="admin/teachers" element={<AdminTeachers />} />
          <Route path="admin/blogs" element={<AdminBlogs />} />
          <Route path="admin/messages" element={<AdminMessages />} />
          <Route path="admin/analytics" element={<AdminAnalytics />} />
          <Route path="admin/settings" element={<AdminSettings />} />

          <Route path="notifications" element={<div className="p-12 text-center"><p className="text-muted-foreground">Notifications page coming soon</p></div>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<Navigate to="/dashboard/admin/settings" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
