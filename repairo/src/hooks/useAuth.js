"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "../services/authService";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Hydrate profile silently if token exists (non-destructive)
  useEffect(() => {
    const token = AuthService.authStorage.get();
    if (!token || user) return;
    (async () => {
      try {
        const res = await AuthService.profile();
        if (res?.user) setUser(res.user);
      } catch (_) {}
    })();
  }, [user]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.login(email, password);
      setUser(data.user || { email });
      return data;
    } catch (err) {
      const errorMessage = err?.error || err?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await AuthService.register(payload);
      setUser(data.user || { email: payload.email });
      return data;
    } catch (err) {
      const errorMessage = err?.error || err?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
    router.push("/login");
  }, [router]);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.profile();
      if (res?.user) setUser(res.user);
      return res?.user || null;
    } catch (err) {
      const errorMessage = err?.error || err?.message || 'Failed to load profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = Boolean(AuthService.authStorage.get());

  return {
    login,
    register,
    logout,
    loadProfile,
    isAuthenticated,
    user,
    loading,
    error,
  };
}

export default useAuth;
