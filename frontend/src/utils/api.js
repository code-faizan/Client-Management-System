import axios from 'axios';

const api = axios.create({
  baseURL: 'https://client-management-system-ygfv.vercel.app/api',
});
// Add a request interceptor to include token in headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
