import { get } from './api';

export async function getTeachers(params) {
  return get('/teachers', { params });
}

export async function getTeacherById(id) {
  return get(`/teachers/${id}`);
}

export async function getTeacherCourses(id) {
  return get(`/teachers/${id}/courses`);
}
