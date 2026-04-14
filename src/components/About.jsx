import React from "react";
import profilePhoto from "../assets/ProfilePicture.jpg.jpeg";

const highlights = [
  { icon: "👦🏻", text: "Naufal Auzan Ramadhan" },
  { icon: "📍", text: "Bogor, Indonesia" },
  { icon: "🎓", text: "Computer Engineering, IPB University" },
  { icon: "⚡", text: "Available for internship & freelance" },
  { icon: "🔧", text: "Mechanical + Software + Everything in between" },
];

const currently = [
  {
    label: "Working on",
    value: "Final year project — Autonomous modular UGV system",
  },
  {
    label: "Learning",
    value: "Fusion360, ROS, AI-Integration, Machine Learning",
  },
];

const techStack = [
  {
    category: "Hardware",
    items: ["Arduino", "ESP32", "Raspberry Pi", "Nvidia Jetson"],
  },
  {
    category: "Software",
    items: ["Python", "JavaScript", "PHP", "C/C++", "Laravel"],
  },
  {
    category: "Fabrication",
    items: ["SMAW Welding", "MIG Welding", "Lathe", "3D Printing"],
  },
  { category: "Tools", items: ["Fusion360", "KiCad", "Git", "Arduino IDE"] },
];

export default function About() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-num">// 01 — ABOUT</div>
        <h2 className="section-title">
          From Metal <span>to Code</span>
        </h2>
      </div>

      <div className="about-grid">
        {/* Left: photo + highlights */}
        <div className="about-left">
          <div className="about-photo-wrapper">
            <img
              src={profilePhoto}
              alt="Naufal Auzan"
              className="about-photo"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="about-photo-placeholder"
              style={{ display: "none" }}
            >
              <span>NA</span>
            </div>
          </div>

          <div className="about-highlights">
            {highlights.map((h) => (
              <div key={h.text} className="highlight-item">
                <span className="highlight-icon">{h.icon}</span>
                <span className="highlight-text">{h.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: text + currently + tech stack */}
        <div className="about-text">
          {/* Bio paragraphs */}
          <p>
            I have hands-on experience across mechanical fabrication, embedded
            systems, IoT, and robotics.{" "}
            <em>I don't just write code — I build the hardware it runs on.</em>
          </p>
          <p>
            Currently in my final year of Computer Engineering at Vocational
            School IPB University, Bogor. My journey started from computer
            networking, expanded into electronics and microcontrollers, then
            kept going — into mechanical fabrication, 3D design, robotics, and
            AI-integrated systems.{" "}
            <em>One problem always led to another field.</em>
          </p>
          <p>
            In practice, this means I can weld a UGV chassis, wire its
            electronics, flash the firmware, and deploy the software that runs
            it — sometimes all in the same project. I work with Arduino, ESP32,
            and Raspberry Pi on the hardware side, and Python, JavaScript, and
            PHP on the software side. Currently expanding into Fusion360 and
            AI-Integration.
          </p>

          {/* Divider */}
          <div className="about-divider" />

          {/* Currently section */}
          <div className="about-currently">
            <div className="about-sub-label">// currently</div>
            {currently.map((c) => (
              <div key={c.label} className="currently-row">
                <span className="currently-label">{c.label}</span>
                <span className="currently-arrow">→</span>
                <span className="currently-value">{c.value}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="about-divider" />

          {/* Tech stack */}
          <div className="about-stack">
            <div className="about-sub-label">// tech stack</div>
            <div className="stack-grid">
              {techStack.map((cat) => (
                <div key={cat.category} className="stack-category">
                  <div className="stack-cat-label">{cat.category}</div>
                  <div className="stack-items">
                    {cat.items.map((item) => (
                      <span key={item} className="stack-badge">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
