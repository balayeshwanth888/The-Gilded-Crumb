"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import Cart from "./Cart";
import { useCart } from "./CartContext";

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

  const {
    totalItems,
    setIsCartOpen,
  } = useCart();

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
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

        <a
          href="#home"
          className="navbar__logo"
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="navbar__logo-mark"
            aria-hidden="true"
          />
          The Gilded Crumb
        </a>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* Cart */}

          <div
            className="cart-icon"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart size={22} />

            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}

          <button
            className={`navbar__toggle ${
              menuOpen ? "is-open" : ""
            }`}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}

        <div
          className={`navbar__mobile ${
            menuOpen ? "is-open" : ""
          }`}
        >
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#cookies"
            className="nav-btn"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Order Now
          </a>
        </div>
      </nav>

      {/* Cart Drawer */}

      <Cart />
    </>
  );
}