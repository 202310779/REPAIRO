"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import NewRepairRequest from "../components/NewRepairRequest";
import RepairHistory from "../components/RepairHistory";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

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
              <span className={styles.statLabel}>Pending</span>
              <span className={styles.statValue}>3</span>
            </div>
            <div className={`${styles.stat} ${styles.inProgress}`}>
              <span className={styles.statLabel}>In Progress</span>
              <span className={styles.statValue}>5</span>
            </div>
            <div className={`${styles.stat} ${styles.completed}`}>
              <span className={styles.statLabel}>Completed</span>
              <span className={styles.statValue}>12</span>
            </div>
          </div>
          <RepairHistory />
        </section>
      </main>
    </div>
  );
}
