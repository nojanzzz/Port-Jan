import React, { useState } from "react";

const CATEGORIES = [
  "All",
  "Mechanical",
  "Hardware",
  "IoT",
  "3D Design",
  "Software",
  "AI",
];

const featured = {
  title: "Remote-Controlled UGV for Anthracnose Detection Using AI",
  category: ["Mechanical", "Hardware", "Embedded", "AI"],
  desc: "The system integrates an NVIDIA Jetson-based computer vision module with a hand-welded chassis, combining mechanical fabrication and embedded AI. Trained on a curated chili pepper dataset, the model enables real-time detection of anthracnose disease in field conditions.",
  tech: ["NVIDIA Jetson", "YOLOv8", "OpenCV", "ESP32", "SMAW Welding"],
  image: require("../assets/projects/antrachnoseugv.jpeg"),
  link: "https://youtu.be/MMnwm0dKHDA?si=7wUbWvZo8Lu891MN",
};

const projects = [
  {
    title: "Modular Semi-Autonomous UGV",
    category: ["3D Design"],
    tag: "Concept",
    desc: "Conceptual design of a lightweight, modular UGV based on Raspberry Pi and RTK-GPS, capable of full autonomous operation and teleoperation. Inspired by conventional tractor technology, redesigned for improved portability, lower cost, and higher field efficiency.",
    tech: [
      "Raspberry Pi",
      "RTK-GPS",
      "Computer Vision",
      "Fusion360",
      "Navigation Algorithm",
    ],
    image: require("../assets/projects/modularsemiautougv.jpg"),
    link: "https://a360.co/4a1si82",
  },
  {
    title: "Semi-Autonomous Mini Combine Harvester",
    category: ["3D Design"],
    tag: "Concept",
    desc: "Design concept for a semi-autonomous harvesting machine integrating Raspberry Pi with a paddy field detection algorithm for automated navigation. Supports both autonomous and teleoperation modes.",
    tech: [
      "Raspberry Pi",
      "RTK-GPS",
      "Computer Vision",
      "Fusion360",
      "Navigation Algorithm",
    ],
    image: require("../assets/projects/minicombine.png"),
    link: "https://a360.co/4vkhl9Q",
  },
  {
    title: "Heavy-Duty UGV Chassis Development",
    category: ["Mechanical"],
    tag: "Mechanical",
    desc: "Engineered and fabricated a heavy-duty chassis structure for unmanned ground vehicle applications. Focused on structural integrity, weight distribution, and terrain adaptability through precision welding and metal fabrication.",
    tech: [
      "SMAW Welding",
      "MIG Welding",
      "Metal Fabrication",
      "Mechanical Design",
    ],
    image: require("../assets/projects/groove1.jpg"),
    link: "https://drive.google.com/file/d/1CyBUOgoyZbMadmarU7UsNb5YdUgkW3hR/view?usp=sharing",
  },
  {
    title: "Solar Panel Tracking System",
    category: ["Mechanical", "Hardware"],
    tag: "Mechanical",
    desc: "A dual-axis solar tracking mechanism designed to maximize photovoltaic energy output by continuously orienting panels toward the sun. The system integrates an ESP32 microcontroller with a linear actuator-driven mechanical structure and sensor-based control logic, enabling precise and adaptive panel orientation.",
    tech: ["ESP32", "Linear Actuator", "LDR Sensor", "Mechanical Design"],
    image: require("../assets/projects/soltarine1.jpg"),
    link: "https://drive.google.com/file/d/1GUBhXAmVsxjE_rS_D_GSJSkFOmoXPAw6/view?usp=sharing",
  },
  {
    title: "Adaptive UGV Camera Mast System",
    category: ["Hardware"],
    tag: "Prototype",
    desc: "A custom-designed camera mast prototype developed to enhance environmental perception for Unmanned Ground Vehicles (UGVs). The system integrates a three-camera configuration—front, left, and right—to provide comprehensive visual coverage for navigation and object detection.",
    tech: ["Camera", "Servo Motor", "Mechanical Design"],
    image: require("../assets/projects/iotcamera.jpg"),
    link: "https://a360.co/3NPSSsc",
  },
  {
    title: "IoT-Based Attendance System",
    category: ["Hardware", "IoT"],
    tag: "IoT",
    desc: "A real-time attendance tracking system using NFC module technology and IoT connectivity. Automatically logs attendance data to a cloud database, accessible via web dashboard — eliminating manual recordkeeping.",
    tech: ["ESP32", "NFC Module", "MQTT"],
    image: require("../assets/projects/IoT-Absen1.jpg"),
    link: null,
  },
  {
    title: "Automatic Portable Water Dispenser",
    category: ["Hardware"],
    tag: "Hardware",
    desc: "A compact, sensor-triggered water dispensing unit designed for portable and hygienic use. The system features automatic flow control via proximity sensing, driven by a programmable logic device using GAL16V8D, enabling efficient hardware-based actuation without a conventional microcontroller.",
    tech: [
      "GAL16V8D",
      "Infrared Sensor",
      "Relay Module",
      "3D Printed Enclosure",
    ],
    image: require("../assets/projects/dispenser2.png"),
    link: "https://drive.google.com/file/d/1Zu0WhWQqnfJkJdKTNdGEGFiGqDO4pr1L/view?usp=sharing",
  },
  {
    title: "Custom 3D-Printed Enclosure for Automatic Grease Spraying System",
    category: ["3D Design"],
    tag: "casing",
    desc: "Designed a compact automatic grease dispensing device with a custom 3D-printed enclosure, enabling consistent lubrication and reduced maintenance in industrial machinery.",
    tech: ["Fusion 360", "3D Printing", "3D Printed Enclosure"],
    image: require("../assets/projects/casingsprayer.jpg"),
    link: "https://a360.co/4j0ag8A",
  },
  {
    title: "Personal Finance Tracker & Budgeting Dashboard",
    category: ["Software", "Production-Ready"],
    tag: "Web",
    desc: "A personal finance management website. Features expense tracking, budget categorization, and visual spending summaries — designed with a clean UI for everyday personal use.",
    tech: ["JavaScript", "PHP", "MySQL", "Laravel"],
    image: require("../assets/projects/piggynote.jpg"),
    link: "https://piggynote-production.up.railway.app",
  },
  {
    title: "UGV Teleoperation & Command Center",
    category: ["Software", "Production-Ready"],
    tag: "Web",
    desc: "A low-latency, mission-control dashboard for Unmanned Ground Vehicles (UGV). Engineered with a full-duplex WebSocket pipeline for 20Hz telemetry sync (IMU, GPS, Battery) and live FPV video streaming. Features a modular Hardware Abstraction Layer (HAL) to seamlessly bridge virtual simulations with physical Raspberry Pi hardware.",
    tech: [
      "FastAPI",
      "WebSockets",
      "Python",
      "OpenCV",
      "JavaScript",
      "Leaflet.js",
    ],
    image: require("../assets/projects/ugvteleoperationsystem.jpg"),
    link: "https://ugv-teleoperation-system-production.up.railway.app/",
  },

  {
    title: "Smart Greenhouse Digital Twin",
    category: ["Software", "Production-Ready"],
    tag: "Web",
    desc: "An enterprise-grade Digital Twin platform for high-precision greenhouse monitoring. It bridges the gap between raw IoT sensor data and spatial intelligence by providing an immersive 3D environment that reflects real-time facility conditions. Designed with a modular, swap-ready architecture to scale from high-fidelity simulations to live industrial hardware integration.",
    tech: ["React", "Three.js", "Zustand", "Tailwind CSS", "Recharts"],
    image: require("../assets/projects/phytopulse.jpg"),
    link: "https://phyto-pulse.vercel.app/",
  },

  {
    title: "3D Product Configurator",
    category: ["Software", "Production-Ready"],
    tag: "Web",
    desc: "An interactive 3D product visualization platform using React and Three.js, enabling real-time customization, exploded-view inspection, and immersive product exploration. Designed to improve user engagement and support business use cases such as e-commerce visualization and product education.",
    tech: ["React", "Three.js", "Vite", "TypeScript"],
    image: require("../assets/projects/3dproductshowcase.jpg"),
    link: "https://3dproductshowcase.vercel.app/",
  },

  {
    title: "Premium Movie Discovery Platform",
    category: ["Software", "Production-Ready"],
    tag: "Web",
    desc: "A premium movie discovery web platform designed to deliver an immersive and visually refined user experience. Built with a modern React-based architecture and powered by Appwrite as a backend service, the platform enables users to seamlessly explore thousands of movies through dynamic search, advanced filtering, and real-time personalized features.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Appwrite"],
    image: require("../assets/projects/cinetimez.png"),
    link: "https://cinetimez.nojanz.workers.dev/",
  },
];

function PlaceholderImage({ title }) {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="project-img-placeholder">
      <span className="project-img-initials">{initials}</span>
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <div className="featured-card">
      <div className="featured-img-wrap">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="featured-img"
          />
        ) : (
          <PlaceholderImage title={project.title} />
        )}
        <div className="featured-badge">⭐ Featured Project</div>
      </div>

      <div className="featured-body">
        <div className="featured-cats">
          {project.category.map((c) => (
            <span key={c} className="cat-badge">
              {c}
            </span>
          ))}
        </div>
        <h3 className="featured-title">{project.title}</h3>
        <p className="featured-desc">{project.desc}</p>
        <div className="featured-tech">
          {project.tech.map((t) => (
            <span key={t} className="stack-badge">
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="featured-link"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-img-wrap">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-img"
          />
        ) : (
          <PlaceholderImage title={project.title} />
        )}
        {project.tag && <span className="project-tag">{project.tag}</span>}
      </div>
      <div className="project-body">
        <div className="project-cats">
          {project.category.map((c) => (
            <span key={c} className="cat-badge cat-badge--sm">
              {c}
            </span>
          ))}
        </div>
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.desc}</div>
        <div className="project-stack">
          {project.tech.map((t) => (
            <span key={t} className="stack-badge">
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            View →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category.includes(active));

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-num">// 03 — PROJECTS</div>
        <h2 className="section-title">
          Featured <span>Work</span>
        </h2>
      </div>

      {/* Featured project */}
      <FeaturedProject project={featured} />

      {/* Filter + grid */}
      <div className="projects-section">
        <div className="projects-filter">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="projects-empty">
            No projects in this category yet.
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
