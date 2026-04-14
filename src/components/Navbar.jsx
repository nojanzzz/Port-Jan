import React, { useState, useEffect } from "react";
import { profile } from "../data/content";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scroll-bar" style={{ width: `${scrollPct}%` }} />
      <nav className="navbar">
        <div className="nav-logo">NOJAN</div>
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link${activeSection === item.id ? " active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {profile.availableForWork && (
          <div className="nav-status">
            <div className="status-dot" />
            AVAILABLE FOR WORK
          </div>
        )}
      </nav>
    </>
  );
}
