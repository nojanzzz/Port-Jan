import React, { useState } from "react";
import { profile } from "../data/content";

const contactLinks = [
  {
    icon: "📧",
    label: profile.email,
    href: `https://mail.google.com/mail/?view=cm&to=${profile.email}`,
  },
  { icon: "💼", label: profile.linkedin, href: `https://${profile.linkedin}` },
  { icon: "🐙", label: profile.github, href: `https://${profile.github}` },
  { icon: "📍", label: profile.location, href: "#" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c0d0a289-4d7e-4eb7-a7b6-b37350b88cef",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-num">// 04 — CONTACT</div>
        <h2 className="section-title">
          Get In <span>Touch</span>
        </h2>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <p>
            Open to internship opportunities, freelance projects, and
            cross-disciplinary collaborations — whether it's embedded systems,
            IoT, robotics, or anything in between. If you have something worth
            building, let's talk.
          </p>
          <div className="contact-links">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-link"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="contact-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form">
          {["name", "email"].map((field) => (
            <div key={field} className="form-group">
              <label className="form-label">{field}</label>
              <input
                className="form-input"
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={
                  field === "email" ? "your@email.com" : "Your name..."
                }
              />
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me your needs..."
              rows={5}
            />
          </div>
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={status === "loading"}
            style={{ opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" && "⏳ SENDING..."}
            {status === "sent" && "✓ MESSAGE SENT!"}
            {status === "error" && "✗ FAILED. TRY AGAIN."}
            {status === "idle" && "SEND MESSAGE →"}
          </button>
        </div>
      </div>
    </section>
  );
}
