"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const { login, register, loading } = useAuth();
  const router = useRouter();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err?.message || 'Login failed');
    }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      await register({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
      });
      toast.success('Account created successfully!');
      // router.push('/dashboard');
    } catch (err) {
      toast.error(err?.message || 'Registration failed');
    }
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
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
            </label>
            <label className={styles.passwordField}>
              <span>Password</span>
              <div className={styles.passwordInput}>
                <input 
                  type={showPw? 'text':'password'} 
                  placeholder="••••••••" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw(v=>!v)}>
                  {showPw? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
            </label>
            <div className={styles.rowBetween}>
              <a className={styles.link} href="#">Forgot Password?</a>
            </div>
            <button className={styles.primary} type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <p className={styles.muted}>Don't have an account? <button type="button" className={styles.linkBtn} onClick={() => setTab('signup')}>Sign Up</button></p>
          </form>
        )}

        {tab === 'signup' && (
          <form onSubmit={onSignup} className={styles.form}>
            <h2>Create an Account</h2>
            <label>
              <span>Username</span>
              <input 
                type="text" 
                placeholder="johndoe" 
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                required 
                minLength={3}
                maxLength={50}
              />
            </label>
            <label>
              <span>Email</span>
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required 
                minLength={5}
                maxLength={100}
              />
            </label>
            <label className={styles.passwordField}>
              <span>Password</span>
              <div className={styles.passwordInput}>
                <input 
                  type={showPw? 'text':'password'} 
                  placeholder="Create a password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required 
                  minLength={8}
                  maxLength={100}
                />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw(v=>!v)}>
                  {showPw? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
            </label>
            <label className={styles.passwordField}>
              <span>Confirm Password</span>
              <div className={styles.passwordInput}>
                <input 
                  type={showPw2? 'text':'password'} 
                  placeholder="Repeat password" 
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required 
                />
                <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPw2(v=>!v)}>
                  {showPw2? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
            </label>
            <button className={styles.primary} type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p className={styles.muted}>Already have an account? <button type="button" className={styles.linkBtn} onClick={() => setTab('login')}>Login</button></p>
          </form>
        )}
      </div>
    </main>
  );
}
