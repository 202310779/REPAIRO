"use client";
import styles from "./technician.module.css";
import TechNavbar from "./TechNavbar";
import useAssignedJobs from "../../hooks/useAssignedJobs";

export default function TechnicianDashboard() {
  const { data, loading, error, fallback } = useAssignedJobs();
  const assigned = Array.isArray(data) && data.length ? data : fallback;

  return (
    <div className={styles.page}>
      <TechNavbar />

      <main className={`container ${styles.main}`}>
        <section className={styles.cards}>
          <div className={styles.card}>
            <strong>Assigned</strong>
            <span>{assigned.length}</span>
          </div>
          <div className={styles.card}>
            <strong>In Progress</strong>
            <span>
              {assigned.filter((a) => a.status === "In Progress").length}
            </span>
          </div>
          <div className={styles.card}>
            <strong>Pending</strong>
            <span>{assigned.filter((a) => a.status === "Pending").length}</span>
          </div>
        </section>

        <section className={styles.table}>
          {loading && <div style={{ padding: 12 }}>Loading assigned jobs…</div>}
          {error && (
            <div style={{ padding: 12, color: "#b91c1c" }}>
              Failed to load from API. Showing sample data.
            </div>
          )}
          <table>
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
              {assigned.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.client}</td>
                  <td>{row.device}</td>
                  <td>{row.issue}</td>
                  <td>{row.status}</td>
                  <td>{row.date}</td>
                  <td>
                    <button className={styles.btn}>Open</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
