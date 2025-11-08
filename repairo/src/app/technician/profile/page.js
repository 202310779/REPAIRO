"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";
import { FaSignOutAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";

export default function TechnicianProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("Alex Thompson");
  const [avatar, setAvatar] = useState(null);
  const [skills, setSkills] = useState(["HVAC", "Appliance", "Electrical"]);
  const [newSkill, setNewSkill] = useState("");
  const [certifications, setCertifications] = useState(
    "NATE Certified; EPA 608"
  );
  const [radius, setRadius] = useState(25); // miles
  const [bio, setBio] = useState(
    "Seasoned technician specializing in residential systems and rapid diagnostics."
  );
  const [availability, setAvailability] = useState({
    Monday: "8am - 5pm",
    Tuesday: "8am - 5pm",
    Wednesday: "8am - 5pm",
    Thursday: "8am - 5pm",
    Friday: "8am - 3pm",
    Saturday: "On-call",
    Sunday: "Off",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [contactPreference, setContactPreference] = useState("email");

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  }

  function addSkill() {
    if (!newSkill.trim()) return;
    setSkills((prev) => [...prev, newSkill.trim()]);
    setNewSkill("");
  }
  function removeSkill(skill) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  function saveProfile() {
    alert("Profile saved (placeholder).\nData would be sent to backend API.");
  }

  function handleLogout() {
    alert("Logging out (placeholder)");
    router.push("/login");
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <span className={styles.brand}>REPAIRO Tech</span>
          <div className={styles.navLinks}>
            <Link href="/technician">Dashboard</Link>
            <Link href="/technician/available">Available</Link>
            <Link href="/technician/messages">Messages</Link>
            <Link href="/technician/profile" className={styles.active}>
              Profile
            </Link>
          </div>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h3>Technician Identity</h3>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar} aria-label="Avatar preview">
              {avatar ? (
                <img src={avatar} alt="Avatar" />
              ) : (
                name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
              )}
            </div>
            <label className={styles.upload}>
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className={styles.section}>
            <div className={styles.row}>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.row}>
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
              />
            </div>
            <div className={styles.row}>
              <label>Service Radius (miles)</label>
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h3>Skills</h3>
          <div className={styles.skillsList}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}{" "}
                <button
                  className={styles.removeSkill}
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className={styles.addSkillWrap}>
            <input
              placeholder="Add skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <button
              onClick={addSkill}
              className={styles.saveBtn}
              style={{ padding: "10px 16px" }}
            >
              <FaPlus /> Add
            </button>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.row}>
            <label>Certifications (semicolon separated)</label>
            <textarea
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              rows={2}
            />
          </div>
          <div className={styles.row}>
            <label>Preferred Contact Method</label>
            <select
              value={contactPreference}
              onChange={(e) => setContactPreference(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="phone">Phone Call</option>
              <option value="in-app">In-App Only</option>
            </select>
          </div>
          <div className={styles.row}>
            <label>Dark Mode</label>
            <div className={styles.inline}>
              <div className={styles.toggle}>
                <input
                  id="darkMode"
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((d) => !d)}
                />
                <span className={styles.track}>
                  <span className={styles.thumb}></span>
                </span>
              </div>
              <label htmlFor="darkMode">
                {darkMode ? "Enabled" : "Disabled"}
              </label>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.card}>
        <h3>Weekly Availability</h3>
        <div className={styles.scheduleGrid}>
          {Object.entries(availability).map(([day, slot]) => (
            <div key={day} className={styles.scheduleItem}>
              <strong style={{ fontSize: 12 }}>{day}</strong>
              <input
                value={slot}
                onChange={(e) =>
                  setAvailability((prev) => ({
                    ...prev,
                    [day]: e.target.value,
                  }))
                }
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <h3>Danger Zone</h3>
        <p style={{ fontSize: 14, color: "#6b7280" }}>
          Deleting account will permanently remove technician data and assigned
          records (irreversible).
        </p>
        <div className={styles.danger}>
          <span>Proceed with extreme caution.</span>
          <button onClick={() => alert("Account deletion placeholder")}>
            Delete Account <FaRegTrashAlt />
          </button>
        </div>
      </section>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={saveProfile} className={styles.saveBtn}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
