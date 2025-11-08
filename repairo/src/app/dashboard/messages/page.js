"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./messages.module.css";

export default function MessagesPage() {
  const [threads, setThreads] = useState([
    {
      id: 1,
      technician: "Alex Tech",
      last: "Let me know if the part arrived.",
      unread: 2,
    },
    {
      id: 2,
      technician: "Maria Fix",
      last: "Battery replaced successfully.",
      unread: 0,
    },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const activeThread = threads.find((t) => t.id === activeId);
  const [messages, setMessages] = useState({
    1: [
      { from: "tech", text: "Diagnostics complete, need a new display." },
      { from: "user", text: "Okay, please proceed." },
      { from: "tech", text: "Let me know if the part arrived." },
    ],
    2: [
      { from: "tech", text: "Battery replaced successfully." },
      { from: "user", text: "Great, thanks!" },
    ],
  });

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { from: "user", text: input.trim() },
      ],
    }));
    setInput("");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/dashboard" className={styles.brand}>
            ← Back to Dashboard
          </Link>
          <h1 className={styles.title}>Messages</h1>
        </div>
      </header>
      <div className={`container ${styles.frame}`}>
        <main className={styles.main}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Conversations</h2>
            <div className={styles.sidebarActions}>
              <button
                type="button"
                onClick={() => alert("New chat (placeholder)")}
              >
                New
              </button>
              <button
                type="button"
                onClick={() => alert("Archive (placeholder)")}
              >
                Archive
              </button>
            </div>
            <div className={styles.search}>
              <input type="text" placeholder="Search technicians" />
            </div>
            <ul className={styles.threadList}>
              {threads.map((t) => (
                <li key={t.id}>
                  <button
                    className={`${styles.threadBtn} ${
                      t.id === activeId ? styles.threadActive : ""
                    }`}
                    onClick={() => setActiveId(t.id)}
                  >
                    <span className={styles.threadName}>{t.technician}</span>
                    <span className={styles.threadLast}>{t.last}</span>
                    {t.unread > 0 && (
                      <span className={styles.badge}>{t.unread}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <section className={styles.chat}>
            {activeThread ? (
              <div className={styles.chatInner}>
                <div className={styles.chatHeader}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span className={styles.statusDot} />
                    <h2 className={styles.chatTitle}>
                      {activeThread.technician}
                    </h2>
                  </div>
                  <div className={styles.chatMeta}>
                    Typically replies within 2h
                  </div>
                </div>
                <div className={styles.messages}>
                  {(messages[activeId] || []).map((m, i) => (
                    <div
                      key={i}
                      className={`${styles.msg} ${
                        m.from === "user" ? styles.msgUser : styles.msgTech
                      }`}
                    >
                      {m.text}
                      <time>now</time>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className={styles.inputBar}>
                  <textarea
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button className={styles.sendBtn} type="submit">
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className={styles.empty}>Select a conversation.</div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
