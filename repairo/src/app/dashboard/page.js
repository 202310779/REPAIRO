"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { useAssignedJobs } from "../../hooks/useAssignedJobs";
import NewRepairRequest from "../components/NewRepairRequest";
import RepairHistory from "../components/RepairHistory";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { JobStatus, formatStatus } from "@/interfaces/api.types";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const { user } = useProfile();
  const { jobs, loading } = useAssignedJobs();

  // State for repair history items
  const initialItems = [
    {
      id: 1,
      device: "Phone",
      model: "iPhone 12",
      issue: "Screen crack",
      date: "2025-10-10",
      status: "Pending",
    },
    {
      id: 2,
      device: "Laptop",
      model: "Dell XPS 13",
      issue: "Battery issue",
      date: "2025-10-12",
      status: "In Progress",
    },
    {
      id: 3,
      device: "Tablet",
      model: "iPad",
      issue: "Charging port",
      date: "2025-10-15",
      status: "Completed",
    },
  ];
  const [repairItems, setRepairItems] = useState(initialItems);

  // State for status filter
  const [statusFilter, setStatusFilter] = useState(null); // null = show all

  // Handler to add new repair request to history
  const handleNewRepairSubmit = (newRequest) => {
    setRepairItems((prev) => [newRequest, ...prev]);
  };

  // Calculate stats based on repair items
  const localStats = {
    pending: repairItems.filter((item) => item.status === "Pending").length,
    inProgress: repairItems.filter((item) => item.status === "In Progress")
      .length,
    completed: repairItems.filter((item) => item.status === "Completed").length,
  };

  // Filter items based on selected status
  const filteredItems = statusFilter
    ? repairItems.filter((item) => item.status === statusFilter)
    : repairItems;

  // Handle status card click
  const handleStatusClick = (status) => {
    // Toggle filter: if same status clicked, show all; otherwise filter by status
    setStatusFilter(statusFilter === status ? null : status);
  };

  const stats = {
    pending: jobs?.filter((j) => j.status === JobStatus.PENDING).length || 0,
    inProgress:
      jobs?.filter((j) => j.status === JobStatus.IN_PROGRESS).length || 0,
    completed:
      jobs?.filter((j) => j.status === JobStatus.COMPLETED).length || 0,
  };

  useEffect(() => {
    console.log("Dashboard ready");
  }, [jobs, user]);

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/landing" className={styles.brand}>
            <img
              className={styles.logoImg}
              src="/images/logo.png"
              alt="Repairo logo"
            />
            <span>Repairo</span>
          </Link>
          <nav className={styles.navLinks}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/messages">Messages</Link>
            <Link href="/dashboard/profile">Profile</Link>
          </nav>
          <div className={styles.user}>
            <button
              className={styles.userBtn}
              onClick={() => setOpen((o) => !o)}
            >
              <FaUserCircle size={22} /> <FaChevronDown />
            </button>
            {open && (
              <div className={styles.dropdown}>
                <button onClick={() => console.log("Change Password")}>
                  Change Password
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className={`container ${styles.main}`}>
        <section className={styles.left}>
          <NewRepairRequest onSubmit={handleNewRepairSubmit} />
        </section>
        <section className={styles.right}>
          <div className={styles.stats}>
            <div
              className={`${styles.stat} ${styles.pending} ${
                styles.clickableStat
              } ${statusFilter === "Pending" ? styles.activeStat : ""}`}
              onClick={() => handleStatusClick("Pending")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) =>
                e.key === "Enter" && handleStatusClick("Pending")
              }
            >
              <span className={styles.statLabel}>
                Pending
                <Badge status={JobStatus.PENDING} style={{ marginLeft: "8px" }}>
                  {localStats.pending}
                </Badge>
              </span>
              <span className={styles.statValue}>{localStats.pending}</span>
            </div>
            <div
              className={`${styles.stat} ${styles.inProgress} ${
                styles.clickableStat
              } ${statusFilter === "In Progress" ? styles.activeStat : ""}`}
              onClick={() => handleStatusClick("In Progress")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) =>
                e.key === "Enter" && handleStatusClick("In Progress")
              }
            >
              <span className={styles.statLabel}>
                In Progress
                <Badge
                  status={JobStatus.IN_PROGRESS}
                  style={{ marginLeft: "8px" }}
                >
                  {localStats.inProgress}
                </Badge>
              </span>
              <span className={styles.statValue}>{localStats.inProgress}</span>
            </div>
            <div
              className={`${styles.stat} ${styles.completed} ${
                styles.clickableStat
              } ${statusFilter === "Completed" ? styles.activeStat : ""}`}
              onClick={() => handleStatusClick("Completed")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) =>
                e.key === "Enter" && handleStatusClick("Completed")
              }
            >
              <span className={styles.statLabel}>
                Completed
                <Badge
                  status={JobStatus.COMPLETED}
                  style={{ marginLeft: "8px" }}
                >
                  {localStats.completed}
                </Badge>
              </span>
              <span className={styles.statValue}>{localStats.completed}</span>
            </div>
          </div>
          <RepairHistory items={filteredItems} filterStatus={statusFilter} />
        </section>
      </main>
    </div>
  );
}
