"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import styles from "./profile/profile.module.css";
import { FaSignOutAlt } from "react-icons/fa";

export default function TechNavbar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isActive = (href) => pathname === href;
  return (
    <div style={{ marginTop: 8 }}>
      <nav className={styles.nav} style={{ paddingRight: 16 }}>
        <div className={styles.navLeft}>
          <div className={styles.brandWrap}>
            <Image
              src="/images/logo.png"
              alt="REPAIRO logo"
              width={28}
              height={28}
              className={styles.brandImg}
            />
            <span className={styles.brand}>REPAIRO Tech</span>
          </div>
          <div className={styles.navLinks}>
            <Link
              href="/technician"
              className={isActive("/technician") ? styles.active : undefined}
            >
              Dashboard
            </Link>
            <Link
              href="/technician/available"
              className={
                isActive("/technician/available") ? styles.active : undefined
              }
            >
              Available
            </Link>
            <Link
              href="/technician/messages"
              className={
                isActive("/technician/messages") ? styles.active : undefined
              }
            >
              Messages
            </Link>
            <Link
              href="/technician/profile"
              className={
                isActive("/technician/profile") ? styles.active : undefined
              }
            >
              Profile
            </Link>
          </div>
        </div>
        <button
          onClick={logout}
          className={styles.logoutBtn}
          style={{ marginRight: 8 }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
}
