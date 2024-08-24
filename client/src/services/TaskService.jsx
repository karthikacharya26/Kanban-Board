import axios from 'axios';

const API_URL = 'https://kanban-board-1fi6.onrender.com/task';

// Get the token from localStorage or wherever it is stored
const getToken = () => localStorage.getItem('token');

export const getTasks = () => {
  const token = getToken();
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createTask = (task) => {
  const token = getToken();
  return axios.post(API_URL, task, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateTask = (taskId, updatedTask) => {
  const token = getToken();
  return axios.put(`${API_URL}/${taskId}`, updatedTask, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteTask = (taskId) => {
  const token = getToken();
  return axios.delete(`${API_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
