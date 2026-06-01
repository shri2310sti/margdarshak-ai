import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://margdarshak-ai-xfro.onrender.com";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
});

// ─── Generate a roadmap ───────────────────────────────────────────────────────
export async function generateRoadmap(payload) {
    const response = await api.post("/roadmap/generate", payload);
    return response.data;
}

// ─── Fetch all roadmaps ───────────────────────────────────────────────────────
export async function fetchAllRoadmaps() {
    const response = await api.get("/roadmaps");
    return response.data;
}

// ─── Fetch single roadmap ─────────────────────────────────────────────────────
export async function fetchRoadmapById(id) {
    const response = await api.get(`/roadmap/${id}`);
    return response.data;
}

// ─── Delete a roadmap ─────────────────────────────────────────────────────────
export async function deleteRoadmap(id) {
    const response = await api.delete(`/roadmap/${id}`);
    return response.data;
}
