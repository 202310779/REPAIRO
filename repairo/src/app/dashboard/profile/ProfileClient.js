"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import styles from "./profile.module.css";

export default function ProfileClient() {
  const [form, setForm] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setForm({
          username: data.user.username || "",
          email: data.user.email || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  
  async function saveProfile(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        fetchProfile();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
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
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
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
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '24px' }}>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Profile Information</h2>
            <form onSubmit={saveProfile} className={styles.form}>
              <label className={styles.field}>
                <span>Username</span>
                <input
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  required
                  minLength={3}
                  maxLength={50}
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
              <button 
                className={styles.primaryBtn} 
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
