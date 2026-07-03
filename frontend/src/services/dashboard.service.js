import { get } from './api';

export async function getStudentDashboard() {
  return get('/dashboard/student');
}

export async function getTeacherDashboard() {
  return get('/dashboard/teacher');
}

export async function getAdminDashboard() {
  return get('/dashboard/admin');
}
