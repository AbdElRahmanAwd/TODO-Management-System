import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "15000"),
});

axios.interceptors.request.use((config) => {
  // no auth for now
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default api;
