import { get, post, patch, del } from './api';

export async function getBlogs(params) {
  return get('/blogs', { params });
}

export async function getBlogBySlug(slug) {
  return get(`/blogs/${slug}`);
}

export async function getFeaturedBlogs() {
  return get('/blogs', { params: { featured: true } });
}

export async function createBlog(data) {
  return post('/blogs', data);
}

export async function updateBlog(id, data) {
  return patch(`/blogs/${id}`, data);
}

export async function deleteBlog(id) {
  return del(`/blogs/${id}`);
}

export async function likeBlog(id) {
  return post(`/blogs/${id}/like`);
}
