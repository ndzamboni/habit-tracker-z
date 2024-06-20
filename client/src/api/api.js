import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createUser = (userData) => axios.post(`${API_BASE_URL}/users`, userData);
export const getUser = (userId) => axios.get(`${API_BASE_URL}/users/${userId}`);
export const createHabit = (habitData) => axios.post(`${API_BASE_URL}/habits`, habitData);
export const getHabit = (habitId) => axios.get(`${API_BASE_URL}/habits/${habitId}`);
