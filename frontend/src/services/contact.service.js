import { post } from './api';

export async function submitContact(data) {
  return post('/contact', data);
}
