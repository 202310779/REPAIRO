"use client";
import { useCallback, useEffect, useState } from "react";
import AuthService from "../services/authService";

export function useProfile({ immediate = true } = {}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    const token = AuthService.authStorage.get();
    if (!token) {
      setProfile(null);
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.profile();
      if (res?.user) setProfile(res.user);
      return res?.user || null;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) refresh();
  }, [immediate, refresh]);

  return { profile, loading, error, refresh };
}

export default useProfile;
