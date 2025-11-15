"use client";
import { endpoints } from "../constants/api";
import { useApi } from "./useApi";
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useAssignedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssignedJobs = async () => {
      // Don't fetch if no user
      if (!user || !user._id) {
        setLoading(false);
        setJobs([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found, skipping repairs fetch");
          setJobs([]);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/repairs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch jobs");
        }

        const data = await response.json();

        let filteredJobs = Array.isArray(data) ? data : [];

        if (user.role === "technician") {
          filteredJobs = filteredJobs.filter(
            (job) => job.technicianId && job.technicianId._id === user._id
          );
        }

        setJobs(filteredJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
        setJobs([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedJobs();
  }, [user]);

  return { jobs, loading, error };
}

export default useAssignedJobs;
