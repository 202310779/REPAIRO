"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./profile.module.css";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Jane User",
    email: "jane@example.com",
    phone: "",
    notify: true,
    timezone: "UTC",
    language: "en",
    dark: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }
  function onPassChange(e) {
    const { name, value } = e.target;
    setPasswords((p) => ({ ...p, [name]: value }));
  }
  function saveProfile(e) {
    e.preventDefault();
    setMessage("Profile saved (placeholder).");
    setTimeout(() => setMessage(""), 3000);
  }
  function changePassword(e) {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage("Password changed (placeholder).");
    setPasswords({ current: "", next: "", confirm: "" });
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/dashboard" className={styles.brand}>
            ← Back to Dashboard
          </Link>
          <h1 className={styles.title}>Profile & Settings</h1>
        </div>
      </header>
      <main className={`container ${styles.main}`}>
        <div className={styles.columns}>
          <div className={styles.leftCol}>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Account</h2>
              <form onSubmit={saveProfile} className={styles.form}>
                <div className={styles.avatarRow}>
                  <div className={styles.avatar} aria-label="avatar preview">
                    {avatar ? (
                      <img alt="avatar" src={URL.createObjectURL(avatar)} />
                    ) : (
                      form.name
                        ?.split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase() || "U"
                    )}
                  </div>
                  <div className={styles.avatarActions}>
                    <label className={styles.uploadBtn}>
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) setAvatar(e.target.files[0]);
                        }}
                        hidden
                      />
                    </label>
                    {avatar && (
                      <button
                        type="button"
                        className={styles.textBtn}
                        onClick={() => setAvatar(null)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <label className={styles.field}>
                  <span>Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Phone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Optional"
                  />
                </label>
                <label className={`${styles.field} ${styles.inline}`}>
                  <input
                    type="checkbox"
                    name="notify"
                    checked={form.notify}
                    onChange={onChange}
                  />
                  <span>Email notifications</span>
                </label>
                <label className={styles.field}>
                  <span>Timezone</span>
                  <select
                    name="timezone"
                    value={form.timezone}
                    onChange={onChange}
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="CET">CET</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Language</span>
                  <select
                    name="language"
                    value={form.language}
                    onChange={onChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </label>
                <label className={`${styles.field} ${styles.inline}`}>
                  <input
                    type="checkbox"
                    name="dark"
                    checked={form.dark}
                    onChange={onChange}
                  />
                  <span>Enable dark mode</span>
                </label>
                <button className={styles.primaryBtn} type="submit">
                  Save Changes
                </button>
              </form>
            </section>
          </div>

          <div className={styles.rightCol}>
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Change Password</h2>
              <form onSubmit={changePassword} className={styles.form}>
                <label className={styles.field}>
                  <span>Current Password</span>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={onPassChange}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>New Password</span>
                  <input
                    type="password"
                    name="next"
                    value={passwords.next}
                    onChange={onPassChange}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Confirm New Password</span>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={onPassChange}
                    required
                  />
                </label>
                <button className={styles.secondaryBtn} type="submit">
                  Update Password
                </button>
              </form>
            </section>

            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Notifications</h2>
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  setMessage("Notification preferences saved.");
                  setTimeout(() => setMessage(""), 3000);
                }}
              >
                <label className={`${styles.field} ${styles.inline}`}>
                  <input type="checkbox" defaultChecked />
                  <span>Repair status updates</span>
                </label>
                <label className={`${styles.field} ${styles.inline}`}>
                  <input type="checkbox" />
                  <span>New technician messages</span>
                </label>
                <label className={`${styles.field} ${styles.inline}`}>
                  <input type="checkbox" />
                  <span>Reminders and tips</span>
                </label>
                <button className={styles.primaryBtn} type="submit">
                  Save Preferences
                </button>
              </form>
            </section>

            <section className={`${styles.card} ${styles.danger}`}>
              <h2 className={styles.cardTitle}>Danger Zone</h2>
              <p>
                Delete your account and all associated data. This action cannot
                be undone.
              </p>
              <button
                className={styles.dangerBtn}
                type="button"
                onClick={() => alert("Delete account (placeholder)")}
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>
        {message && <div className={styles.toast}>{message}</div>}
      </main>
    </div>
  );
}
