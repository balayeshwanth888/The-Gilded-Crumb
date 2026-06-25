"use client";

import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="hero-eyebrow">Baked Daily · Delivered Warm</span>

        <h1>
          The Ultimate <span>Cookie Experience</span>
        </h1>

        <p>
          Freshly baked cookies made with love, premium ingredients, and
          delivered straight to your doorstep.
        </p>

        <div className="hero-buttons">
          <a href="#cookies" className="hero-btn hero-btn--primary">
            Order Now
          </a>
          <a href="#features" className="hero-btn hero-btn--secondary">
            Explore Flavors
          </a>
        </div>

        <div className="hero-trust">
          <div className="hero-trust__avatars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>
            <strong>10,000+</strong> cookies delivered this month
          </p>
        </div>
      </div>

      <div className="hero-image">
  <div className="hero-image__frame">
    <div className="hero-image__ring" aria-hidden="true" />
    <div className="hero-image__crumb hero-image__crumb--1" aria-hidden="true" />
    <div className="hero-image__crumb hero-image__crumb--2" aria-hidden="true" />
    <div className="hero-image__crumb hero-image__crumb--3" aria-hidden="true" />

    <img
      src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&h=860&q=80"
      alt="Stack of freshly baked chocolate chip cookies"
    />

    <div className="hero-image__badge">
      <span className="hero-image__badge-rating">4.9★</span>
      <span className="hero-image__badge-label">Customer Rated</span>
    </div>
  </div>
</div>
    </section>
  );
}