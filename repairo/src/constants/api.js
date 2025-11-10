// Centralized API configuration and endpoints
// Keep this tiny and environment-driven

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  // Fallback: local dev API. Replace with your backend URL when available
  "http://localhost:3000/api";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/me",
  },
  technician: {
    assigned: "/technician/assigned",
    available: "/technician/available",
  },
  repairs: {
    list: "/repairs",
    create: "/repairs",
  },
};

export function buildUrl(path) {
  if (!path) return BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
