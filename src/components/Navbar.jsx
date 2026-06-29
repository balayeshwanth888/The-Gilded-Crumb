"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

import Cart from "./Cart";
import { useCart } from "./CartContext";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ProfileDropdown from "./ProfileDropdown";

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

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const [user, setUser] = useState(null);

  const {
    totalItems,
    setIsCartOpen,
  } = useCart();

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        onScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape")
        setMenuOpen(false);
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
  }, []);

  return (
    <>
      <nav
        className={`navbar ${
          scrolled
            ? "navbar--scrolled"
            : ""
        }`}
      >
        <a
          href="#home"
          className="navbar__logo"
          onClick={() =>
            setMenuOpen(false)
          }
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* Login / Profile */}

          {!user ? (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                className="nav-auth-btn"
                onClick={() =>
                  setLoginOpen(true)
                }
              >
                Login
              </button>

              <button
                className="nav-auth-btn signup"
                onClick={() =>
                  setSignupOpen(true)
                }
              >
                Sign Up
              </button>
            </div>
          ) : (
            <ProfileDropdown
              user={user}
              onLogout={() => {
                localStorage.removeItem(
                  "currentUser"
                );
                setUser(null);
              }}
            />
          )}

          {/* Cart */}

          <div
            className="cart-icon"
            onClick={() =>
              setIsCartOpen(true)
            }
          >
            <FaShoppingCart
              size={22}
            />

            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </div>

          {/* Mobile Menu */}

          <button
            className={`navbar__toggle ${
              menuOpen
                ? "is-open"
                : ""
            }`}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(
                (open) => !open
              )
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

          {!user ? (
            <div className="mobile-auth">
              <button
                className="nav-auth-btn"
                onClick={() => {
                  setMenuOpen(false);
                  setLoginOpen(true);
                }}
              >
                Login
              </button>

              <button
                className="nav-auth-btn signup"
                onClick={() => {
                  setMenuOpen(false);
                  setSignupOpen(true);
                }}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="mobile-profile">
              <div className="mobile-user">
                <FaUserCircle size={22} />
                <span>{user.name}</span>
              </div>

              <button
                className="nav-auth-btn"
                onClick={() => {
                  localStorage.removeItem(
                    "currentUser"
                  );

                  setUser(null);
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}

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

      <LoginModal
        isOpen={loginOpen}
        onClose={() =>
          setLoginOpen(false)
        }
        onLogin={(loggedUser) =>
          setUser(loggedUser)
        }
        openSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      <SignupModal
        isOpen={signupOpen}
        onClose={() =>
          setSignupOpen(false)
        }
        openLogin={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
      />

      <Cart />
    </>
  );
}