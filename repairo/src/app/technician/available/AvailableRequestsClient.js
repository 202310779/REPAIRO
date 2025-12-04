"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import styles from "../technician.module.css";
import {
  FaTools,
  FaMobileAlt,
  FaLaptop,
  FaBlender,
  FaClock,
} from "react-icons/fa";
import Badge from "@/components/atoms/Badge";

// Lazy load TechNavbar
const TechNavbar = dynamic(() => import("../TechNavbar"), {
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

export default function AvailableRequestsClient() {
  const available = [
    {
      id: 201,
      device: "Phone",
      model: "Pixel 8",
      issue: "Speaker not working",
      posted: "2025-11-01",
      priority: "high",
    },
    {
      id: 202,
      device: "Laptop",
      model: "MacBook Air",
      issue: "Overheating",
      posted: "2025-11-02",
      priority: "medium",
    },
    {
      id: 203,
      device: "Appliance",
      model: "Blender",
      issue: "Motor jam",
      posted: "2025-11-03",
      priority: "low",
    },
  ];

  function claim(id) {
    alert(`Claim request ${id} (placeholder)`);
  }

  const getDeviceIcon = (device) => {
    if (device === "Phone") return <FaMobileAlt />;
    if (device === "Laptop") return <FaLaptop />;
    if (device === "Appliance") return <FaBlender />;
    return <FaTools />;
  };

  const getPriorityBadge = (priority) => {
    if (priority === "high") return <Badge status="cancelled">High</Badge>;
    if (priority === "medium") return <Badge status="pending">Medium</Badge>;
    if (priority === "low") return <Badge status="completed">Low</Badge>;
    return <Badge>{priority}</Badge>;
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
            <h1 className={styles.welcomeTitle}>Available Requests 🔧</h1>
            <p className={styles.welcomeSubtitle}>
              Claim jobs that match your skills
            </p>
          </div>
        </div>

        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.sectionTitle}>
              <FaClock /> Open Requests
            </h2>
            <span style={{ fontSize: 14, color: "#64748b" }}>
              {available.length} available
            </span>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Device</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Posted</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {available.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <span className={styles.jobId}>#{r.id}</span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span style={{ color: "#2563eb", fontSize: 18 }}>
                          {getDeviceIcon(r.device)}
                        </span>
                        <div>
                          <div style={{ fontWeight: 500 }}>{r.device}</div>
                          <div style={{ fontSize: 12, color: "#64748b" }}>
                            {r.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.issueCell}>{r.issue}</td>
                    <td>{getPriorityBadge(r.priority)}</td>
                    <td className={styles.dateCell}>{r.posted}</td>
                    <td>
                      <button
                        className={styles.btnGhost}
                        onClick={() => claim(r.id)}
                      >
                        Claim Job
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
