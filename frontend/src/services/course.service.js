import { get, post, patch, del } from './api';

export async function getCourses(params) {
  return get('/courses', { params });
}

export async function getCourseBySlug(slug) {
  return get(`/courses/${slug}`);
}

export async function getFeaturedCourses() {
  return get('/courses', { params: { featured: true } });
}

export async function getCoursesByCategory(category, params = {}) {
  return get('/courses', { params: { category, ...params } });
}

export async function createCourse(data) {
  return post('/courses', data);
}

export async function updateCourse(id, data) {
  return patch(`/courses/${id}`, data);
}

export async function deleteCourse(id) {
  return del(`/courses/${id}`);
}
