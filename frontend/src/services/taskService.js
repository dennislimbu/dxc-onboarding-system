import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

const API_URL = `${API_BASE_URL}/api/tasks`;

export const getTasksByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const completeTask = async (taskId) => {
  const response = await axios.put(`${API_URL}/${taskId}/complete`);
  return response.data;
};

export const createTaskForUser = async (userId, taskData) => {
  const response = await axios.post(`${API_URL}/user/${userId}`, taskData);
  return response.data;
};