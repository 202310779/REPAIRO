"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthLoader from "../../components/AuthLoader";

export default function LoginClient() {
  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const { login, register, loading } = useAuth();
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserType, setLoginUserType] = useState("user");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupUserType, setSignupUserType] = useState("user");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupSkills, setSignupSkills] = useState([]);
  const [signupSkillInput, setSignupSkillInput] = useState("");
  const [signupCertifications, setSignupCertifications] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [signupBio, setSignupBio] = useState("");

  const addSkill = () => {
    if (
      signupSkillInput.trim() &&
      !signupSkills.includes(signupSkillInput.trim())
    ) {
      setSignupSkills([...signupSkills, signupSkillInput.trim()]);
      setSignupSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSignupSkills(signupSkills.filter((skill) => skill !== skillToRemove));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginEmail, loginPassword);
      const userRole = response?.user?.role || "user";

      // Validate role matches selection
      if (loginUserType === "technician" && userRole !== "technician") {
        toast.error(
          "This account is not registered as a technician. Please login as a user."
        );
        return;
      }
      if (loginUserType === "user" && userRole === "technician") {
        toast.error(
          "This account is registered as a technician. Please login as a technician."
        );
        return;
      }

      toast.success("Login successful!");
      const redirectPath =
        userRole === "technician" ? "/technician" : "/dashboard";
      router.push(redirectPath);
    } catch (err) {
      toast.error(err?.message || "Login failed");
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
        role: signupUserType,
        ...(signupUserType === "technician" && {
          phone: signupPhone,
          skills: signupSkills,
          certifications: signupCertifications?.name,
          bio: signupBio,
        }),
      });
      toast.success("Account created successfully! Please sign in.");
      setSignupUsername("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirmPassword("");
      setSignupPhone("");
      setSignupSkills([]);
      setSignupSkillInput("");
      setSignupCertifications(null);
      setSignupBio("");
      setTimeout(() => {
        setTab("login");
        router.push("/login");
      }, 1200);
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  function handleFile(file) {
    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(file.type)) {
      toast.error(
        `Invalid file type: ${file.type}. Only PDF or images are allowed.`
      );
      return;
    }
    // revoke previous preview if any
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
    setSignupCertifications(file);
  }

  function removeFile() {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
    setFilePreviewUrl(null);
    setSignupCertifications(null);
  }

  useEffect(() => {
    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

  return (
    <main className={styles.wrapper}>
      <Link href="/" className={styles.backToHome}>
        <FaHome /> Back to Home
      </Link>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo.png"
            alt="REPAIRO logo"
            width={50}
            height={50}
            className={styles.logo}
          />
          <h1 className={styles.brandTitle}>REPAIRO</h1>
        </div>
        <div className={styles.tabs}>
          <button
            className={tab === "login" ? styles.active : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={tab === "signup" ? styles.active : ""}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" && (
          <form onSubmit={onLogin} className={styles.form}>
            <AuthLoader visible={loading} message={"Signing you in..."} />
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access your account</p>
            <div className={styles.userTypeSelector}>
              <label className={styles.userTypeLabel}>Login as</label>
              <div className={styles.userTypeOptions}>
                <label
                  className={`${styles.userTypeOption} ${
                    loginUserType === "user" ? styles.userTypeActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="loginUserType"
                    value="user"
                    checked={loginUserType === "user"}
                    onChange={(e) => setLoginUserType(e.target.value)}
                  />
                  <span className={styles.userTypeIcon}>👤</span>
                  <span className={styles.userTypeText}>User</span>
                </label>
                <label
                  className={`${styles.userTypeOption} ${
                    loginUserType === "technician" ? styles.userTypeActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="loginUserType"
                    value="technician"
                    checked={loginUserType === "technician"}
                    onChange={(e) => setLoginUserType(e.target.value)}
                  />
                  <span className={styles.userTypeIcon}>🔧</span>
                  <span className={styles.userTypeText}>Technician</span>
                </label>
              </div>
            </div>
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
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <div className={styles.rowBetween}>
              <a className={styles.link} href="#">
                Forgot Password?
              </a>
            </div>
            <button className={styles.primary} type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className={styles.muted}>
              Don't have an account?{" "}
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => setTab("signup")}
              >
                Sign Up
              </button>
            </p>
          </form>
        )}

        {tab === "signup" && (
          <form onSubmit={onSignup} className={styles.form}>
            <h2>Create an Account</h2>
            <div className={styles.userTypeSelector}>
              <label className={styles.userTypeLabel}>Sign up as</label>
              <div className={styles.userTypeOptions}>
                <label
                  className={`${styles.userTypeOption} ${
                    signupUserType === "user" ? styles.userTypeActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="signupUserType"
                    value="user"
                    checked={signupUserType === "user"}
                    onChange={(e) => setSignupUserType(e.target.value)}
                  />
                  <span className={styles.userTypeIcon}>👤</span>
                  <span className={styles.userTypeText}>User</span>
                </label>
                <label
                  className={`${styles.userTypeOption} ${
                    signupUserType === "technician" ? styles.userTypeActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="signupUserType"
                    value="technician"
                    checked={signupUserType === "technician"}
                    onChange={(e) => setSignupUserType(e.target.value)}
                  />
                  <span className={styles.userTypeIcon}>🔧</span>
                  <span className={styles.userTypeText}>Technician</span>
                </label>
              </div>
            </div>
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
            {signupUserType === "technician" && (
              <>
                <label>
                  <span>Phone Number</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        padding: "10px 12px",
                        background: "#f3f4f6",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px 0 0 8px",
                        fontWeight: "500",
                      }}
                    >
                      +63
                    </span>
                    <input
                      type="tel"
                      placeholder="9171234567"
                      value={signupPhone}
                      onChange={(e) =>
                        setSignupPhone(
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      required
                      style={{ borderRadius: "0 8px 8px 0", flex: 1 }}
                    />
                  </div>
                </label>
                <label>
                  <span>Skills</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Enter a skill"
                      value={signupSkillInput}
                      onChange={(e) => setSignupSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      style={{
                        padding: "10px 16px",
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "transform 0.2s",
                      }}
                    >
                      + Add
                    </button>
                  </div>
                  {signupSkills.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginTop: "8px",
                      }}
                    >
                      {signupSkills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            background:
                              "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                            color: "white",
                            borderRadius: "16px",
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "16px",
                              lineHeight: "1",
                              padding: "0",
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </label>
                <label>
                  <span>Certifications (Upload PDF/Image)</span>
                  <div
                    className={`${styles.fileDrop} ${
                      isDragActive ? styles.fileDropActive : ""
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragActive(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragActive(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragActive(false);
                      const f = e.dataTransfer.files && e.dataTransfer.files[0];
                      if (f) handleFile(f);
                    }}
                    onClick={() => {
                      if (!signupCertifications && fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={styles.fileInputHidden}
                      onChange={(e) => {
                        const f = e.target.files && e.target.files[0];
                        if (f) handleFile(f);
                      }}
                    />

                    {signupCertifications ? (
                      <div className={styles.fileInfo}>
                        {signupCertifications.type?.startsWith("image/") ? (
                          <img
                            src={filePreviewUrl}
                            alt="preview"
                            className={styles.filePreviewImg}
                          />
                        ) : (
                          <span className={styles.fileIcon}>📄</span>
                        )}
                        <div>
                          <div className={styles.fileName}>
                            {signupCertifications.name}
                          </div>
                          <div className={styles.fileMeta}>
                            {(signupCertifications.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                        <button
                          type="button"
                          className={styles.fileRemoveBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeFile();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className={styles.filePlaceholder}>
                        Drag & drop a file here, or click to choose
                        (PDF/JPG/PNG)
                      </div>
                    )}
                  </div>
                </label>
                <label>
                  <span>Professional Bio</span>
                  <textarea
                    placeholder="Tell us about your experience..."
                    value={signupBio}
                    onChange={(e) => setSignupBio(e.target.value)}
                    rows={3}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                </label>
              </>
            )}
            <label className={styles.passwordField}>
              <span>Password</span>
              <div className={styles.passwordInput}>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  minLength={8}
                  maxLength={100}
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPw((v) => !v)}
                >
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <label className={styles.passwordField}>
              <span>Confirm Password</span>
              <div className={styles.passwordInput}>
                <input
                  type={showPw2 ? "text" : "password"}
                  placeholder="Repeat password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPw2((v) => !v)}
                >
                  {showPw2 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <button className={styles.primary} type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            <p className={styles.muted}>
              Already have an account?{" "}
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => setTab("login")}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
