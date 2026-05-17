import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

export const studentService = {
  getAll: async () => {
    const response = await api.get('/students');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/students', data);
    return response.data;
  },
};
