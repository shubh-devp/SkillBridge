import { get, post, patch, del } from './api';

export async function enroll(courseId) {
  return post('/enrollments', { courseId });
}

export async function getMyEnrollments() {
  return get('/enrollments/me');
}

export async function updateProgress(id, data) {
  return patch(`/enrollments/${id}/progress`, data);
}

export async function completeCourse(id) {
  return post(`/enrollments/${id}/complete`);
}

export async function cancelEnrollment(id) {
  return del(`/enrollments/${id}`);
}
