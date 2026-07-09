import axios from "axios";

// Axios is used to connect the frontend with REST APIs (4.4).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

// CREATE — persist a finished stopwatch session
export const saveSession = (payload) => api.post("/sessions", payload);

// READ — fetch all saved sessions
export const fetchSessions = () => api.get("/sessions");

// UPDATE — e.g. edit a session's notes
export const updateSession = (id, payload) => api.put(`/sessions/${id}`, payload);

// DELETE — remove a session
export const deleteSession = (id) => api.delete(`/sessions/${id}`);

export default api;
