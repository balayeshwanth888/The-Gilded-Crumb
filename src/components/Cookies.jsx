"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/cookies.css";

const COOKIES = [
  {
    id: "choc-chip",
    name: "Chocolate Chip",
    price: 149,
    rating: 4.8,
    reviews: 312,
    bestseller: true,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
  },
  {
    id: "choco-chip-cookies",
    name: "Choco Chip Cookies",
    price: 199,
    rating: 4.6,
    reviews: 184,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35",
  },
  {
    id: "rye-bread",
    name: "Rye Bread",
    price: 179,
    rating: 4.7,
    reviews: 201,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    id: "double-choco-Donut",
    name: "Double Choco Donut",
    price: 229,
    rating: 4.9,
    reviews: 267,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    price: 139,
    rating: 4.7,
    reviews: 178,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa",
  },
];

const formatPrice = (value) =>
  `₹${new Intl.NumberFormat("en-IN").format(value)}`;

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6.1 6.6.7-5 4.6 1.4 6.6L12 17l-5.9 3.5 1.4-6.6-5-4.6 6.6-.7L12 2.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="cta-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M4 12.5l5 5.5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Cookies() {
  const [addedId, setAddedId] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      cardRefs.current.forEach((el) => el?.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (id) => {
    setAddedId(id);
    window.setTimeout(() => setAddedId((current) => (current === id ? null : current)), 1600);
  };

  return (
    <section className="cookies" id="cookies">
      <div className="cookies__intro">
        <span className="cookies__eyebrow">Fresh From The Oven</span>
        <h2 className="cookies__heading">Featured Cookies</h2>
      </div>

      <div className="cookie-grid">
        {COOKIES.map((cookie, i) => (
          <div
            className="cookie-card"
            key={cookie.id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="cookie-card__media">
              {cookie.bestseller && (
                <span className="cookie-card__badge">Bestseller</span>
              )}
              <img
                src={`${cookie.image}?auto=format&fit=crop&w=480&q=80`}
                alt={`${cookie.name} cookie`}
                loading="lazy"
                width="480"
                height="360"
              />
            </div>

            <div className="cookie-card__body">
              <div className="cookie-card__rating" aria-label={`Rated ${cookie.rating} out of 5`}>
                <StarIcon />
                <span>{cookie.rating}</span>
                <span className="cookie-card__reviews">({cookie.reviews})</span>
              </div>

              <h3>{cookie.name}</h3>
              <span className="cookie-card__price">{formatPrice(cookie.price)}</span>

              <button
                className={`cookie-card__cta ${addedId === cookie.id ? "is-added" : ""}`}
                onClick={() => handleAddToCart(cookie.id)}
              >
                <span className="cta-label cta-label--default">Add to Cart</span>
                <span className="cta-label cta-label--added">
                  <CheckIcon />
                  Added
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}