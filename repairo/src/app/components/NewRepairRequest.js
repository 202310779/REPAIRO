"use client";
import { useState } from "react";
import styles from "./NewRepairRequest.module.css";

export default function NewRepairRequest({ onSubmit: onSubmitCallback }) {
  const initial = { deviceType: "", model: "", issue: "", date: "" };
  const [form, setForm] = useState(initial);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.deviceType || !form.model || !form.issue) return;

    // Create repair request object
    const newRequest = {
      id: Date.now(), // Temporary ID
      device: form.deviceType,
      model: form.model,
      issue: form.issue,
      date: form.date || today,
      status: "Pending",
    };

    // Call parent callback to add to history
    if (onSubmitCallback) {
      onSubmitCallback(newRequest);
    }

    console.log("Submit repair request", newRequest);
    setForm(initial);
  };

  return (
    <div className={styles.card}>
      <h3>New Repair Request</h3>
      <form onSubmit={onSubmit} className={styles.form}>
        <label>
          <span>Device Type</span>
          <div className={styles.selectWrap}>
            <select
              className={styles.select}
              name="deviceType"
              value={form.deviceType}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Select device
              </option>
              <option>Phone</option>
              <option>Laptop</option>
              <option>Tablet</option>
              <option>Appliance</option>
            </select>
          </div>
        </label>

        <label>
          <span>Model</span>
          <input
            name="model"
            value={form.model}
            onChange={onChange}
            placeholder="e.g., iPhone 12"
            required
          />
        </label>

        <label>
          <span>Issue Description</span>
          <textarea
            name="issue"
            value={form.issue}
            onChange={onChange}
            placeholder="Briefly describe the issue"
            rows={4}
            required
          />
        </label>

        <label>
          <span>Preferred Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            min={today}
          />
        </label>

        <button type="submit" className={styles.submit}>
          Submit Request
        </button>
      </form>
    </div>
  );
}
