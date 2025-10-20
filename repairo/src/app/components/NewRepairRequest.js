"use client";
import { useState } from 'react';
import styles from './NewRepairRequest.module.css';

export default function NewRepairRequest() {
  const initial = { deviceType: '', model: '', issue: '', date: '' };
  const [form, setForm] = useState(initial);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.deviceType || !form.model || !form.issue) return;
    console.log('Submit repair request', form);
    // Send to backend API. future enhancement.
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
              <option value="" disabled>Select device</option>
              <option>Phone</option>
              <option>Laptop</option>
              <option>Tablet</option>
              <option>Appliance</option>
            </select>
          </div>
        </label>

        <label>
          <span>Model</span>
          <input name="model" value={form.model} onChange={onChange} placeholder="e.g., iPhone 12" required />
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
          <input type="date" name="date" value={form.date} onChange={onChange} />
        </label>

        <button type="submit" className={styles.submit}>Submit Request</button>
      </form>
    </div>
  );
}
