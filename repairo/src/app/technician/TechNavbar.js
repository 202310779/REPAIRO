"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import styles from "./technician.module.css";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";

export default function TechNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = () => {
    setOpen(false);
    logout();
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/technician" className={styles.brand}>
            <Image
              src="/images/logo.png"
              alt="REPAIRO logo"
              width={28}
              height={28}
              className={styles.logoImg}
            />
            <span>Repairo Tech</span>
          </Link>
          <nav className={styles.navLinks}>
            <Link href="/technician">Dashboard</Link>
            <Link href="/technician/available">Available Jobs</Link>
            <Link href="/technician/messages">Messages</Link>
            <Link href="/technician/profile">Profile</Link>
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
                <button onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
