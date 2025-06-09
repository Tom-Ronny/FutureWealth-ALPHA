import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// AUTH
export const registerUser = (email, password) =>
  axios.post(`${API_BASE}/auth/register`, { email, password });

export const loginUser = (email, password) =>
  axios.post(`${API_BASE}/auth/login`, { email, password });

// USER PROFILE
export const saveUserProfile = (profile, token) =>
  axios.post(`${API_BASE}/user-profile/save`, profile, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getUserProfile = (userId, token) =>
  axios.get(`${API_BASE}/user-profile/get/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// SIMULATION
export const runSimulation = (input, token) =>
  axios.post(`${API_BASE}/simulation/run`, input, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getSimulationHistory = (userId, token) =>
  axios.get(`${API_BASE}/simulation/history/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const downloadSimulationReport = (simulationId, token) => {
  window.open(`${API_BASE}/simulation/report/${simulationId}?token=${token}`, '_blank');
};
