import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const getTasks = () => api.get('/tasks');
export const addTask = (task: { title: string; description: string | null }) => api.post('/tasks', task);
export const updateTask = (id: string, updates: { title?: string; description: string | null; completed?: boolean }) =>
  api.put(`/tasks/${id}`, updates);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
