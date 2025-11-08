"use client";
import styles from "./technician.module.css";
import TechNavbar from "./TechNavbar";

export default function TechnicianDashboard() {
  const assigned = [
    {
      id: 101,
      client: "Jane Doe",
      device: "Phone • iPhone 12",
      issue: "Screen crack",
      status: "In Progress",
      date: "2025-11-01",
    },
    {
      id: 102,
      client: "Mike Ross",
      device: "Laptop • XPS 13",
      issue: "Battery issue",
      status: "Pending",
      date: "2025-11-03",
    },
    {
      id: 103,
      client: "Nina Park",
      device: "Tablet • iPad",
      issue: "Charging port",
      status: "Pending",
      date: "2025-11-04",
    },
  ];

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
