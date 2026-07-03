import { post, get, patch } from './api';

export async function login(email, password) {
  const data = await post('/auth/login', { email, password });
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
}

export async function register(userData) {
  const data = await post('/auth/register', userData);
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
}

export async function logout() {
  try {
    await post('/auth/logout');
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export async function refreshToken(token) {
  const data = await post('/auth/refresh', { refreshToken: token });
  return data;
}

export async function getProfile() {
  return get('/auth/me');
}

export async function updateProfile(data) {
  return patch('/auth/me', data);
}

export async function updatePassword(data) {
  return patch('/auth/password', data);
}

export async function forgotPassword(email) {
  return post('/auth/forgot-password', { email });
}

export async function resetPassword(token, password) {
  return post('/auth/reset-password', { token, password });
}
