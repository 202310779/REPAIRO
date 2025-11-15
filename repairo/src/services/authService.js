"use client";
// src/services/authService.js
// Central auth service: handles network calls + token persistence.

import RequestService from "./requestService";
import { endpoints } from "../constants/api";

const TOKEN_KEY = "token";

export const authStorage = {
  get() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set(token) {
    if (typeof window === "undefined") return;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  },
  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

async function login(email, password) {
  const data = await devFallback(() =>
    RequestService.post(
      endpoints.auth.login,
      { email, password },
      { withAuth: false }
    )
  );
  authStorage.set(data.token || "dev-token");
  return data;
}

async function register(payload) {
  const data = await devFallback(() =>
    RequestService.post(endpoints.auth.register, payload, { withAuth: false })
  );
  authStorage.set(data.token || "dev-token");
  return data;
}

async function profile() {
  return devFallback(() => RequestService.get(endpoints.auth.profile));
}

function logout() {
  authStorage.clear();
}

// Dev fallback preserves previous fake behavior when backend missing.
async function devFallback(fn) {
  try {
    return await fn();
  } catch (err) {
    if (err?.status === 404 || err?.message === "Failed to fetch") {
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              token: "dev-token",
              user: { email: "dev@example.com", role: "user" },
            }),
          250
        )
      );
    }
    throw err;
  }
}

export const AuthService = { login, register, profile, logout, authStorage };
export default AuthService;
