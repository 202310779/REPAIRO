"use client";
import styles from "../technician.module.css";
import TechNavbar from "../TechNavbar";

export default function AvailableRequests() {
  const available = [
    {
      id: 201,
      device: "Phone • Pixel 8",
      issue: "Speaker not working",
      posted: "2025-11-01",
    },
    {
      id: 202,
      device: "Laptop • MacBook Air",
      issue: "Overheating",
      posted: "2025-11-02",
    },
    {
      id: 203,
      device: "Appliance • Blender",
      issue: "Motor jam",
      posted: "2025-11-03",
    },
  ];

  function claim(id) {
    alert(`Claim request ${id} (placeholder)`);
  }

  return (
    <div className={styles.page}>
      <TechNavbar />
      <main className={`container ${styles.main}`}>
        <section className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Device</th>
                <th>Issue</th>
                <th>Posted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {available.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.device}</td>
                  <td>{r.issue}</td>
                  <td>{r.posted}</td>
                  <td>
                    <button
                      className={styles.btnGhost}
                      onClick={() => claim(r.id)}
                    >
                      Claim
                    </button>
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
