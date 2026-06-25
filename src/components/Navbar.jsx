"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/navbar.css";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#cookies", label: "Cookies" },
  { href: "#features", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <a href="#home" className="navbar__logo" onClick={() => setMenuOpen(false)}>
        <span className="navbar__logo-mark" aria-hidden="true" />
        The Gilded Crumb
      </a>

      <ul className="nav-links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <button
        className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar__mobile ${menuOpen ? "is-open" : ""}`}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#cookies" className="nav-btn" onClick={() => setMenuOpen(false)}>
          Order Now
        </a>
      </div>
    </nav>
  );
}