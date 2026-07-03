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
const NotFound = lazy(() => import('@/pages/NotFound'));
const StudentDashboard = lazy(() => import('@/pages/dashboard/StudentDashboard'));
const TeacherDashboard = lazy(() => import('@/pages/dashboard/TeacherDashboard'));
const AdminDashboard = lazy(() => import('@/pages/dashboard/AdminDashboard'));
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'));

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
        </Route>

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
          <Route path="teacher" element={<TeacherDashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
