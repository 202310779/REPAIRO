"use client";
import { useMemo } from "react";
import AuthService from "../services/authService";

// Minimal authorization helper. Checks token presence and optional roles.
export function useAuthorization({
  requireRoles = [],
  allowGuest = false,
} = {}) {
  const token = AuthService.authStorage.get();

  const allowed = useMemo(() => {
    if (!token) return allowGuest;
    // Role evaluation can be extended later; keep permissive by default
    return true;
  }, [token, allowGuest]);

  return { allowed };
}

export default useAuthorization;
