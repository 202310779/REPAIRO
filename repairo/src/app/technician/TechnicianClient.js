"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "./technician.module.css";
import {
  FaBriefcase,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import Badge from "@/components/atoms/Badge";

// Lazy load TechNavbar
const TechNavbar = dynamic(() => import("./TechNavbar"), {
  loading: () => (
    <div
      style={{
        height: "64px",
        background: "white",
        borderBottom: "1px solid #e5e7eb",
      }}
    />
  ),
  ssr: false,
});

// Fallback sample data for when API fails
const fallbackData = [
  {
    id: 1,
    client: "John Doe",
    device: "iPhone 12",
    issue: "Screen crack",
    status: "Pending",
    date: "2025-12-01",
  },
  {
    id: 2,
    client: "Jane Smith",
    device: "MacBook Pro",
    issue: "Battery issue",
    status: "In Progress",
    date: "2025-12-02",
  },
];

export default function TechnicianClient({ initialJobs = [] }) {
  const [jobs, setJobs] = useState(
    initialJobs.length > 0 ? initialJobs : fallbackData
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Poll for updates every 30 seconds
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("/api/repairs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setJobs(Array.isArray(data) && data.length > 0 ? data : fallbackData);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(fetchJobs, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  const assigned = Array.isArray(jobs) ? jobs : [];

  const stats = {
    total: assigned.length,
    assigned: assigned.filter(
      (a) => a.status === "Assigned" || a.status === "Pending"
    ).length,
    inProgress: assigned.filter((a) => a.status === "In Progress").length,
    completed: assigned.filter((a) => a.status === "Completed").length,
  };

  const getStatusBadge = (status) => {
    if (status === "In Progress")
      return <Badge status="in_progress">{status}</Badge>;
    if (status === "Completed")
      return <Badge status="completed">{status}</Badge>;
    if (status === "Pending") return <Badge status="pending">{status}</Badge>;
    return <Badge>{status}</Badge>;
  };

  return (
    <div className={styles.page}>
      <Suspense
        fallback={
          <div
            style={{
              height: "64px",
              background: "white",
              borderBottom: "1px solid #e5e7eb",
            }}
          />
        }
      >
        <TechNavbar />
      </Suspense>

      <main className={`container ${styles.main}`}>
        <div className={styles.welcome}>
          <div>
            <h1 className={styles.welcomeTitle}>
              Welcome back, Technician! 👋
            </h1>
            <p className={styles.welcomeSubtitle}>
              Here&apos;s your overview for today
            </p>
          </div>
          {error && (
            <div className={styles.errorBanner}>
              <FaExclamationTriangle />
              <span>Failed to load from API. Showing sample data.</span>
            </div>
          )}
        </div>

        <section className={styles.cards}>
          <div className={`${styles.card} ${styles.cardTotal}`}>
            <div className={styles.cardIcon}>
              <FaBriefcase size={24} />
            </div>
            <div className={styles.cardContent}>
              <strong className={styles.cardLabel}>Total Jobs</strong>
              <span className={styles.cardValue}>{stats.total}</span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.cardAssigned}`}>
            <div className={styles.cardIcon}>
              <FaClock size={24} />
            </div>
            <div className={styles.cardContent}>
              <strong className={styles.cardLabel}>Assigned</strong>
              <span className={styles.cardValue}>{stats.assigned}</span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.cardProgress}`}>
            <div className={styles.cardIcon}>
              <FaSpinner size={24} />
            </div>
            <div className={styles.cardContent}>
              <strong className={styles.cardLabel}>In Progress</strong>
              <span className={styles.cardValue}>{stats.inProgress}</span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.cardCompleted}`}>
            <div className={styles.cardIcon}>
              <FaCheckCircle size={24} />
            </div>
            <div className={styles.cardContent}>
              <strong className={styles.cardLabel}>Completed</strong>
              <span className={styles.cardValue}>{stats.completed}</span>
            </div>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.sectionTitle}>
              <FaTools /> My Assigned Jobs
            </h2>
            {loading && (
              <span className={styles.loadingText}>
                <FaSpinner className={styles.spinIcon} /> Loading...
              </span>
            )}
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Device</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assigned.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.emptyState}>
                      <FaTools size={48} />
                      <p>No jobs assigned yet</p>
                      <span>Check the Available tab for new requests</span>
                    </td>
                  </tr>
                ) : (
                  assigned.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <span className={styles.jobId}>#{row.id}</span>
                      </td>
                      <td className={styles.clientCell}>{row.client}</td>
                      <td>{row.device}</td>
                      <td className={styles.issueCell}>{row.issue}</td>
                      <td>{getStatusBadge(row.status)}</td>
                      <td className={styles.dateCell}>{row.date}</td>
                      <td>
                        <button className={styles.btn}>View Details</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
