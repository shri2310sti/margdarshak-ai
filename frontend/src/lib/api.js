import axios from "axios";

const BASE_URL = "https://margdarshak-ai-xfro.onrender.com";

function getAuthHeader() {
  try {
    const user = JSON.parse(localStorage.getItem("margdarshak_user"));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  } catch {
    return {};
  }
}

const api = axios.create({ baseURL: BASE_URL });

export async function generateRoadmap(payload) {
  const res = await api.post("/roadmap/generate", payload, { headers: getAuthHeader() });
  return res.data;
}

export async function fetchAllRoadmaps() {
  const res = await api.get("/roadmaps", { headers: getAuthHeader() });
  return res.data;
}

export async function fetchRoadmapById(id) {
  const res = await api.get(`/roadmap/${id}`, { headers: getAuthHeader() });
  return res.data;
}

export async function deleteRoadmap(id) {
  const res = await api.delete(`/roadmap/${id}`, { headers: getAuthHeader() });
  return res.data;
}
