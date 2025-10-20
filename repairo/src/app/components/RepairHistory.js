"use client";
import { useState } from 'react';
import { FaMobileAlt, FaLaptop, FaTabletAlt, FaTv, FaClock, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import styles from './RepairHistory.module.css';

const deviceIcons = {
  Phone: <FaMobileAlt className={styles.deviceIconSvg} size={24} />,
  Laptop: <FaLaptop className={styles.deviceIconSvg} size={24} />,
  Tablet: <FaTabletAlt className={styles.deviceIconSvg} size={24} />,
  Appliance: <FaTv className={styles.deviceIconSvg} size={24} />
};

const statusIcons = {
  Pending: <FaClock className={`${styles.statusIcon} ${styles.statusIconPending}`} size={16} />,
  "In Progress": <FaSpinner className={`${styles.statusIcon} ${styles.statusIconProgress}`} size={16} />,
  Completed: <FaCheckCircle className={`${styles.statusIcon} ${styles.statusIconCompleted}`} size={16} />
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

const initialItems = [
  { id: 1, device: 'Phone', model: 'iPhone 12', issue: 'Screen crack', date: '2025-10-10', status: 'Pending' },
  { id: 2, device: 'Laptop', model: 'Dell XPS 13', issue: 'Battery issue', date: '2025-10-12', status: 'In Progress' },
  { id: 3, device: 'Tablet', model: 'iPad', issue: 'Charging port', date: '2025-10-15', status: 'Completed' },
];

export default function RepairHistory() {
  const [ratings, setRatings] = useState({});

  const setRating = (id, value) => setRatings(prev => ({ ...prev, [id]: value }));
  const submitRating = (id) => {
    console.log('Submit rating', { id, rating: ratings[id] || 0 });
  };

  const tagClass = (status) =>
    status === 'Pending' ? `${styles.tag} ${styles.tagPending}` :
    status === 'In Progress' ? `${styles.tag} ${styles.tagProgress}` :
    `${styles.tag} ${styles.tagCompleted}`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Repair History</h3>
      </div>
      <div className={styles.list}>
        {initialItems.map(item => (
          <div key={item.id} className={styles.item}>
            <div className={styles.row}>
              <div className={styles.infoLeft}>
                <div className={styles.deviceIcon}>
                  {deviceIcons[item.device] || <FaTv className={styles.deviceIconSvg} size={24} />}
                </div>
                <div className={styles.meta}>
                  <h4 className={styles.title}>{item.device} • {item.model}</h4>
                  <p className={styles.desc}>{item.issue}</p>
                  <p className={styles.date}>{formatDate(item.date)}</p>
                </div>
              </div>
              <div className={styles.statusWrap}>
                <span className={tagClass(item.status)}>
                  {statusIcons[item.status]}
                  {item.status}
                </span>
              </div>
            </div>
            {item.status === 'Completed' && (
              <>
                <hr className={styles.sep} />
                <div className={styles.rateRow}>
                  <div className={styles.rating}>
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n}
                        type="button"
                        className={styles.starBtn}
                        aria-label={`${n} star${n>1?'s':''}`}
                        onClick={() => setRating(item.id, n)}
                      >
                        <span className={(ratings[item.id] || 0) >= n ? styles.starFilled : styles.star}>★</span>
                      </button>
                    ))}
                  </div>
                  <button className={styles.submitRating} onClick={() => submitRating(item.id)}>
                    Submit Rating
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
