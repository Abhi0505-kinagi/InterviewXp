import axios from "axios";

// Use Vite env or fallback to localhost:3000 (Node backend)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getSentiment = async (text) => {
  const res = await axios.post(`${API_BASE}/api/ml/sentiment`, { text });
  return res.data;
};

export const getSelection = async (text) => {
  const res = await axios.post(`${API_BASE}/api/ml/selection`, { text });
  return res.data;
};
