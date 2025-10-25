import Link from 'next/link';
import styles from './landing.module.css';
import { FaLeaf, FaBolt, FaShieldAlt, FaHeadset, FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';

export const metadata = { title: 'Repairo — Landing' };

export default function LandingPage() {
  const features = [
    { icon: <FaShieldAlt />, title: 'Trusted Technicians', desc: 'Verified professionals for peace of mind.' },
    { icon: <FaBolt />, title: 'Fast Turnaround', desc: 'Quick diagnostics and efficient repairs.' },
    { icon: <FaLeaf />, title: 'Eco-Friendly', desc: 'Repair over replace to reduce waste.' },
    { icon: <FaHeadset />, title: 'Expert Support', desc: 'Get help at every step of your repair.' },
    { icon: <FaMapMarkerAlt />, title: 'Status Tracking', desc: 'Track your repair status in real time.' },
    { icon: <FaStar />, title: 'Quality Guarantee', desc: 'Service you can trust and rate.' },
  ];

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/landing" className={styles.brand}>
            <img className={styles.logoImg} src="/images/logo.png" alt="Repairo logo" />
            <span className={styles.brandText}>Repairo</span>
          </Link>
          <div className={styles.navActions}>
            <Link href="/login" className={styles.btnGhost}>Login</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1>
              <span>Expert Device Repairs,</span>
              <span>Delivered with Trust</span>
            </h1>
            <p>
              Connect with certified technicians for fast, reliable repairs on all your electronic devices. 
              Eco-friendly solutions that extend your device's lifespan.
            </p>
            <Link href="/dashboard" className={styles.heroCta}>Get Started <FaArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.about}> 
        <div className="container">
          <h2>Why Choose Repairo?</h2>
          <div className={styles.cardsGrid}>
            {features.map((f, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.cardIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div>
            <h3>Ready to repair smarter?</h3>
            <p>Join Repairo and connect with trusted technicians now.</p>
          </div>
          <Link href="/login" className={styles.footerCta}>Create Account <FaArrowRight /></Link>
        </div>
      </footer>
    </div>
  );
}
