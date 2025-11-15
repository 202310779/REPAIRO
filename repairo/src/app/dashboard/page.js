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

  const stats = {
    pending: jobs?.filter(j => j.status === JobStatus.PENDING).length || 0,
    inProgress: jobs?.filter(j => j.status === JobStatus.IN_PROGRESS).length || 0,
    completed: jobs?.filter(j => j.status === JobStatus.COMPLETED).length || 0
  };

  useEffect(() => {
    console.log('Dashboard ready');
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
          <NewRepairRequest />
        </section>
        <section className={styles.right}>
          <div className={styles.stats}>
            <div className={`${styles.stat} ${styles.pending}`}>
              <span className={styles.statLabel}>
                Pending
                <Badge status={JobStatus.PENDING} style={{marginLeft: '8px'}}>
                  {stats.pending}
                </Badge>
              </span>
              <span className={styles.statValue}>{stats.pending}</span>
            </div>
            <div className={`${styles.stat} ${styles.inProgress}`}>
              <span className={styles.statLabel}>
                In Progress
                <Badge status={JobStatus.IN_PROGRESS} style={{marginLeft: '8px'}}>
                  {stats.inProgress}
                </Badge>
              </span>
              <span className={styles.statValue}>{stats.inProgress}</span>
            </div>
            <div className={`${styles.stat} ${styles.completed}`}>
              <span className={styles.statLabel}>
                Completed
                <Badge status={JobStatus.COMPLETED} style={{marginLeft: '8px'}}>
                  {stats.completed}
                </Badge>
              </span>
              <span className={styles.statValue}>{stats.completed}</span>
            </div>
          </div>
          <RepairHistory />
        </section>
      </main>
    </div>
  );
}
