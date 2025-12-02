"use client";
import styles from "./technician.module.css";
import TechNavbar from "./TechNavbar";
import useAssignedJobs from "../../hooks/useAssignedJobs";
import {
  FaBriefcase,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaTools,
  FaExclamationTriangle,
} from "react-icons/fa";
import Badge from "@/components/atoms/Badge";
import { JobStatus } from "@/interfaces/api.types";

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

export default function TechnicianDashboard() {
  const { jobs, loading, error } = useAssignedJobs();

  // Use jobs if available, otherwise use fallback
  const assigned =
    Array.isArray(jobs) && jobs.length > 0
      ? jobs
      : error
      ? fallbackData
      : jobs || [];

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
      <TechNavbar />

      <main className={`container ${styles.main}`}>
        <div className={styles.welcome}>
          <div>
            <h1 className={styles.welcomeTitle}>
              Welcome back, Technician! 👋
            </h1>
            <p className={styles.welcomeSubtitle}>
              Here's your overview for today
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
