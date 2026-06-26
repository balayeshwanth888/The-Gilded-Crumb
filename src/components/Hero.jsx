"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/hero.css";

const REAL_SLIDES = [
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&h=860&q=80",
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&h=860&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&h=860&q=80",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&h=860&q=80",
];

const N = REAL_SLIDES.length;
// Clone the last slide at the front and the first slide at the back,
// so the track can always move forward and never has to "jump back".
const LOOP_SLIDES = [REAL_SLIDES[N - 1], ...REAL_SLIDES, REAL_SLIDES[0]];

export default function Hero() {
  // index is a position in LOOP_SLIDES; 1..N are the real slides.
  const [index, setIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const timerRef = useRef(null);
  const dragRef = useRef({ startX: 0, dragging: false });

  // Triggers the text/image entrance animation reliably after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const activeDot = ((index - 1) % N + N) % N;

  const step = (delta) => setIndex((i) => i + delta);

  const goToReal = (realIdx) => setIndex(realIdx + 1);

  const restartAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => step(1), 3800);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) restartAutoplay();
    return () => clearInterval(timerRef.current);
  }, []);

  // When we land on a clone (either end), silently snap to the matching
  // real slide with the transition turned off for one frame.
  const handleTransitionEnd = () => {
    if (index === N + 1) {
      setWithTransition(false);
      setIndex(1);
    } else if (index === 0) {
      setWithTransition(false);
      setIndex(N);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  const handlePointerDown = (e) => {
    dragRef.current.dragging = true;
    dragRef.current.startX = e.touches ? e.touches[0].clientX : e.clientX;
    clearInterval(timerRef.current);
  };

  const handlePointerUp = (e) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = endX - dragRef.current.startX;

    if (delta > 40) step(-1);
    else if (delta < -40) step(1);

    restartAutoplay();
  };

  return (
    <section className="hero" id="home">
      <div className={`hero-content ${loaded ? "is-loaded" : ""}`}>
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

      <div className={`hero-image ${loaded ? "is-loaded" : ""}`}>
        <div className="hero-image__frame">
          <div className="hero-image__ring" aria-hidden="true" />
          <div className="hero-image__crumb hero-image__crumb--1" aria-hidden="true" />
          <div className="hero-image__crumb hero-image__crumb--2" aria-hidden="true" />
          <div className="hero-image__crumb hero-image__crumb--3" aria-hidden="true" />

          <div
            className="hero-image__viewport"
            onMouseDown={handlePointerDown}
            onMouseUp={handlePointerUp}
            onMouseLeave={() => (dragRef.current.dragging = false)}
            onTouchStart={handlePointerDown}
            onTouchEnd={handlePointerUp}
          >
            <div
              className="hero-image__track"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: withTransition ? undefined : "none",
              }}
            >
              {LOOP_SLIDES.map((src, i) => (
                <div className="hero-image__slide" key={i}>
                  <img
                    src={src}
                    alt={`Freshly baked cookie, photo ${((i - 1 + N) % N) + 1} of ${N}`}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-image__dots" role="tablist" aria-label="Cookie photo selector">
            {REAL_SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeDot}
                aria-label={`Show photo ${i + 1}`}
                className={`hero-image__dot ${i === activeDot ? "is-active" : ""}`}
                onClick={() => {
                  goToReal(i);
                  restartAutoplay();
                }}
              />
            ))}
          </div>

          <div className="hero-image__badge">
            <span className="hero-image__badge-rating">4.9★</span>
            <span className="hero-image__badge-label">Customer Rated</span>
          </div>
        </div>
      </div>
    </section>
  );
}