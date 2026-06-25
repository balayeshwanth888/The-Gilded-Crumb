"use client";

import { useEffect, useRef } from "react";
import "../styles/reviews.css";

const REVIEWS = [
  {
    id: "rahul",
    name: "Rahul",
    rating: 5,
    text: "Best cookies I've ever tasted. Fresh and delicious every single time.",
  },
  {
    id: "priya",
    name: "Priya",
    rating: 5,
    text: "Amazing flavors and quick delivery — they arrived still warm.",
  },
  {
    id: "arjun",
    name: "Arjun",
    rating: 4,
    text: "Perfect balance of sweetness and crunch. My go-to order now.",
  },

  // New Reviews

  {
    id: "sneha",
    name: "Sneha",
    rating: 5,
    text: "The chocolate chip cookies are heavenly. Soft, rich, and packed with flavor.",
  },
  {
    id: "vikram",
    name: "Vikram",
    rating: 5,
    text: "Premium quality ingredients and beautiful packaging. Highly recommended!",
  },
  {
    id: "ananya",
    name: "Ananya",
    rating: 5,
    text: "Every bite feels homemade. My family finished the entire box in one evening.",
  },
  {
    id: "rohit",
    name: "Rohit",
    rating: 4,
    text: "Great variety of flavors and excellent customer service. Will order again.",
  },
  {
    id: "meera",
    name: "Meera",
    rating: 5,
    text: "Absolutely delicious! The cookies arrived fresh and tasted like they came straight from the oven.",
  },
];

function StarIcon({ filled, index }) {
  return (
    <svg
      className="review-star"
      style={{ animationDelay: `${index * 0.08}s` }}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M12 2.5l2.9 6.1 6.6.7-5 4.6 1.4 6.6L12 17l-5.9 3.5 1.4-6.6-5-4.6 6.6-.7L12 2.5Z" />
    </svg>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <span className="review-card__quote" aria-hidden="true">
        "
      </span>

      <div className="review-card__stars" aria-label={`Rated ${review.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <StarIcon key={starIndex} index={starIndex} filled={starIndex < review.rating} />
        ))}
      </div>

      <p className="review-card__text">{review.text}</p>

      <div className="review-card__author">
        <span className="review-card__avatar" aria-hidden="true">
          {review.name.charAt(0)}
        </span>
        <h4>{review.name}</h4>
      </div>
    </div>
  );
}

export default function Reviews() {
  const introRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !introRef.current) {
      introRef.current?.classList.add("is-visible");
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
      { threshold: 0.3 }
    );

    observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__intro" ref={introRef}>
        <span className="reviews__eyebrow">From Our Customers</span>
        <h2 className="reviews__heading">Customer Reviews</h2>
      </div>

      <div className="review-marquee">
        <div className="review-marquee__track">
          {loop.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}