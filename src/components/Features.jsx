"use client";

import { useEffect, useRef } from "react";
import "../styles/features.css";

const FEATURES = [
  {
    id: "ingredients",
    title: "Small-Batch Ingredients",
    body: "Organic flour, real butter, and Belgian chocolate — hand-picked for every batch, no substitutes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21V9" strokeLinecap="round" />
        <path d="M12 9c0-3 2-5 5-5-1 3-2 5-5 5Z" />
        <path d="M12 13c0-3-2-5-5-5 1 3 2 5 5 5Z" />
        <path d="M12 17c0-2.5 1.6-4 4-4-.8 2.4-1.6 4-4 4Z" />
        <path d="M12 17c0-2.5-1.6-4-4-4 .8 2.4 1.6 4 4 4Z" />
      </svg>
    ),
  },
  {
    id: "fresh",
    title: "Baked Fresh, Daily",
    body: "No freezers, no shortcuts. Dough hits the oven the same morning it's mixed.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 19h12" strokeLinecap="round" />
        <path d="M7 19v-6.5C7 8.5 9.2 5 12 5s5 3.5 5 7.5V19" />
        <path d="M9.5 12.5c0-1.7 1.1-3 2.5-3s2.5 1.3 2.5 3" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "Delivered Warm",
    body: "Insulated boxes and same-day routes mean cookies arrive soft, never stale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 16V8a1 1 0 0 1 1-1h9v9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 11h4l3 3v2h-7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="17.5" r="1.6" />
        <circle cx="17" cy="17.5" r="1.6" />
      </svg>
    ),
  },
  {
    id: "loved",
    title: "Loved by Thousands",
    body: "Real reviews, real repeat customers — see why they keep coming back for more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20s-7-4.4-9.3-8.7C1.4 8.3 3 5.5 6 5c2-.3 3.6.8 4.5 2.4C11.4 5.8 13 4.7 15 5c3 .5 4.6 3.3 3.3 6.3C16 15.6 12 20 12 20Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Features() {
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

  return (
    <section className="features" id="features">
      <div className="features__intro">
        <span className="features__eyebrow">The Cookie Promise</span>
        <h2 className="features__heading">Why Choose Us?</h2>
      </div>

      <div className="feature-grid">
        {FEATURES.map((feature, i) => (
          <div
            className="feature-card"
            key={feature.id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="feature-card__icon" aria-hidden="true">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}