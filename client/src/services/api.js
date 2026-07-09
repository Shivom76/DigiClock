import axios from "axios";

// Axios is used to connect the frontend with REST APIs (4.4).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

// AUTHORIZATION: attach the JWT (if we have one) to every outgoing
// request as a Bearer token, so protected routes on the backend accept it.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever responds 401 (missing/expired/invalid token), the
// stored session is stale — clear it and send the user back to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// --- Auth ---
export const registerUser = (payload) => api.post("/auth/register", payload);
export const loginUser = (payload) => api.post("/auth/login", payload);
export const fetchMe = () => api.get("/auth/me");

// --- Sessions (CRUD) ---
export const saveSession = (payload) => api.post("/sessions", payload);
export const fetchSessions = () => api.get("/sessions");
export const updateSession = (id, payload) => api.put(`/sessions/${id}`, payload);
export const deleteSession = (id) => api.delete(`/sessions/${id}`);

export default api;
