import React from "react";

const education = [
  {
    degree: "Computer Engineering Technology",
    institution: "Vocational School IPB University",
    location: "Bogor, Indonesia",
    period: "2022 — Present",
    points: [
      "Focus on embedded systems, IoT, mechanical and hardware integration.",
      "Actively involved in multidisciplinary projects combining electronics, software, and fabrication.",
    ],
  },
  {
    degree: "Computer & Network Engineering",
    institution: "SMK Negeri 3 Kota Bogor",
    location: "Bogor, Indonesia",
    period: "2019 — 2022",
    points: [
      "Hands-on experience in computer hardware, networking infrastructure, and basic electronics.",
      "Involved in troubleshooting, configuring network devices, and maintaining system performance.",
    ],
  },
];

const experience = [
  {
    role: "Engineering Research Intern",
    company: "Politeknik Enjiniring Pertanian Indonesia (PEPI)",
    period: "Sep 2025 — Dec 2025",
    points: [
      "Conducted research and field observation across laboratory and workshop facilities to identify technological gaps and development opportunities in agricultural engineering.",
      "Conceptualized a Modular Semi-Autonomous UGV based on Raspberry Pi and RTK-GPS, capable of both full autonomous operation and teleoperation — inspired by conventional tractor technology, redesigned for lighter weight, improved portability, lower cost, and higher efficiency. Delivered as a 3D design prototype and system architecture blueprint.",
      "Designed a Semi-Autonomous Mini Combine Harvester system integrating Raspberry Pi with a paddy field detection algorithm for autonomous navigation assistance, supporting both automatic and teleoperation modes.",
    ],
  },
  {
    role: "Research Assistant Intern",
    company: "Electromechanical Workshop, IPB University",
    period: "Feb 2025 — Jun 2025",
    points: [
      "Developed a remote-controlled UGV for anthracnose detection using Machine Learning.",
      "Specialized in mechanical fabrication: cutting, welding, bending, drilling, and lathe operations.",
      "Contributed to embedded system integration and prototyping.",
    ],
  },
  {
    role: "Robotics Engineering Intern",
    company: "Roboratory Bogor",
    period: "Feb 2021 — Jun 2021",
    points: [
      "Designed and assembled Arduino-based educational robotics kits with sensor integration.",
      "Created programs using Scratch for logic-based learning modules.",
      "Managed component inventory and quality-tested robotic kits.",
    ],
  },
];

function TimelineCard({ item, type }) {
  const isExp = type === "experience";
  return (
    <div className="resume-card">
      <div className="resume-card-header">
        <div>
          <div className="resume-card-title">
            {isExp ? item.role : item.degree}
          </div>
          <div className="resume-card-sub">
            {isExp ? item.company : item.institution}
            {!isExp && (
              <span className="resume-card-location"> · {item.location}</span>
            )}
          </div>
        </div>
        <div className="resume-card-period">{item.period}</div>
      </div>
      <ul className="resume-card-points">
        {item.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-num">// 02 — RESUME</div>
        <h2 className="section-title">
          Experience <span>& Education</span>
        </h2>
      </div>

      <div className="resume-grid">
        {/* Left: Education + Downloads */}
        <div className="resume-col">
          <div className="resume-col-header">
            <span className="resume-col-icon">🎓</span>
            <span className="resume-col-title">Education</span>
          </div>
          <div className="resume-col-items">
            {education.map((e) => (
              <TimelineCard key={e.degree} item={e} type="education" />
            ))}
          </div>

          {/* Downloads */}
          <div className="resume-downloads">
            <div className="resume-col-header" style={{ marginTop: 8 }}>
              <span className="resume-col-icon">📄</span>
              <span className="resume-col-title">Documents</span>
            </div>

            {/* Download CV */}
            <a
              href="/files/CV_Naufal_Auzan_ATS.pdf"
              target="_blank"
              rel="noreferrer"
              className="cv-download-btn"
            >
              <span className="cv-download-icon">↓</span>
              <div>
                <div className="cv-download-label">Download Full CV</div>
                <div className="cv-download-sub">PDF · Always up to date</div>
              </div>
            </a>

            {/* IELTS Certificate */}
            <a
              href="/files/ID19524511709-30-11-2024-ETRF.pdf"
              target="_blank"
              rel="noreferrer"
              className="cv-download-btn"
            >
              <span className="cv-download-icon cv-download-icon--ielts">
                ↓
              </span>
              <div>
                <div className="cv-download-label">IELTS Certificate</div>
                <div className="cv-download-sub">
                  Overall Band&nbsp;
                  <span className="ielts-score">7.0</span>
                  &nbsp;· CEFR C1 · Nov 2024
                </div>
                <div className="ielts-breakdown">
                  L&nbsp;<span>7.5</span>&nbsp;·&nbsp; R&nbsp;<span>7.5</span>
                  &nbsp;·&nbsp; W&nbsp;<span>6.0</span>&nbsp;·&nbsp; S&nbsp;
                  <span>6.0</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Experience */}
        <div className="resume-col">
          <div className="resume-col-header">
            <span className="resume-col-icon">💼</span>
            <span className="resume-col-title">Work Experience</span>
          </div>
          <div className="resume-col-items">
            {experience.map((e) => (
              <TimelineCard key={e.role} item={e} type="experience" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
