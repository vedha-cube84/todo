import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  },
});

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getTodos = (token) => api.get('/todos', { headers: { Authorization: token } });
export const createTodo = (token, data) => api.post('/todos', data, { headers: { Authorization: token } });
export const updateTodo = (token, id, data) => api.put(`/todos/${id}`, data, { headers: { Authorization: token } });
export const deleteTodo = (token, id) => api.delete(`/todos/${id}`, { headers: { Authorization: token } });

export default api;
