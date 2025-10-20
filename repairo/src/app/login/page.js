"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    console.log('Login submit');
  };
  const onSignup = (e) => {
    e.preventDefault();
    console.log('Signup submit');
  };

  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.tabs}>
          <button className={tab==='login'?styles.active:''} onClick={() => setTab('login')}>Login</button>
          <button className={tab==='signup'?styles.active:''} onClick={() => setTab('signup')}>Sign Up</button>
        </div>

        {tab === 'login' && (
          <form onSubmit={onLogin} className={styles.form}>
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your account</p>
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" required />
            </label>
            <label className={styles.passwordField}>
              <span>Password</span>
              <div className={styles.passwordInput}>
                <input type={showPw? 'text':'password'} placeholder="••••••••" required />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw(v=>!v)}>
                  {showPw? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
            </label>
            <div className={styles.rowBetween}>
              <a className={styles.link} href="#">Forgot Password?</a>
            </div>
            <button className={styles.primary} type="submit">Sign In</button>
            <p className={styles.muted}>Don’t have an account? <button type="button" className={styles.linkBtn} onClick={() => setTab('signup')}>Sign Up</button></p>
          </form>
        )}

        {tab === 'signup' && (
          <form onSubmit={onSignup} className={styles.form}>
            <h2>Create an Account</h2>
            <label>
              <span>Full Name</span>
              <input type="text" placeholder="Jane Doe" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" required />
            </label>
            <label className={styles.passwordField}>
              <span>Password</span>
              <div className={styles.passwordInput}>
                <input type={showPw? 'text':'password'} placeholder="Create a password" required />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw(v=>!v)}>
                  {showPw? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
            </label>
            <label className={styles.passwordField}>
              <span>Confirm Password</span>
              <div className={styles.passwordInput}>
                <input type={showPw2? 'text':'password'} placeholder="Repeat password" required />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw2(v=>!v)}>
                  {showPw2? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
            </label>
            <button className={styles.primary} type="submit">Create Account</button>
            <p className={styles.muted}>Already have an account? <button type="button" className={styles.linkBtn} onClick={() => setTab('login')}>Login</button></p>
          </form>
        )}
      </div>
    </main>
  );
}
