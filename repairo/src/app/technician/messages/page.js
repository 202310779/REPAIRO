"use client";
import { useState } from "react";
import styles from "./messages.module.css";
import techStyles from "../technician.module.css";
import TechNavbar from "../TechNavbar";

export default function TechnicianMessages() {
  const [threads, setThreads] = useState([
    { id: 1, client: "Jane Doe", last: "Thanks for the update", unread: 1 },
    { id: 2, client: "Mike Ross", last: "When can you start?", unread: 0 },
  ]);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const messagesInitial = {
    1: [
      { from: "client", text: "Screen still flickers." },
      { from: "tech", text: "I will replace the flex cable." },
      { from: "client", text: "Thanks for the update" },
    ],
    2: [
      { from: "client", text: "When can you start?" },
      { from: "tech", text: "I can begin tomorrow morning." },
    ],
  };
  const [messages, setMessages] = useState(messagesInitial);
  const active = threads.find((t) => t.id === activeId);

  function send(e) {
    e.preventDefault();
    sendMessage();
  }

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { from: "tech", text: input.trim() },
      ],
    }));
    setInput("");
    // note: consider auto-scrolling messages area after render
  }

  return (
    <div className={techStyles.page}>
      <TechNavbar />

      <div className={`container ${styles.frame}`}>
        <main className={styles.main}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Clients</h2>
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
              <input type="text" placeholder="Search clients" />
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
                    <span className={styles.threadName}>{t.client}</span>
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
            {active ? (
              <div className={styles.chatInner}>
                <div className={styles.chatHeader}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <span className={styles.statusDot} />
                    <h2 className={styles.chatTitle}>{active.client}</h2>
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
                        m.from === "tech" ? styles.msgUser : styles.msgTech
                      }`}
                    >
                      {m.text}
                      <time>now</time>
                    </div>
                  ))}
                </div>

                <form onSubmit={send} className={styles.inputBar}>
                  <textarea
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
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
