"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/cookies.css";
import "../styles/product-modal.css";
import { useCart } from "./CartContext";

// Mock Cookie API with Ingredients
const COOKIE_API = [
  {
    id: "choc-chip",
    name: "Chocolate Chip Deluxe",
    price: 149,
    rating: 4.8,
    reviews: 312,
    bestseller: true,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=480&q=80",
    description: "Premium chocolate chip cookies loaded with rich, melting chocolate chunks.",
    ingredients: [
      "All-purpose flour",
      "Butter",
      "Brown sugar",
      "Eggs",
      "Vanilla extract",
      "Baking soda",
      "Salt",
      "Premium chocolate chips",
      "Walnuts (optional)",
    ],
  },
  {
    id: "choco-chip-cookies",
    name: "Double Chocolate Cookies",
    price: 199,
    rating: 4.6,
    reviews: 184,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=480&q=80",
    description: "Decadent double chocolate cookies for chocolate lovers.",
    ingredients: [
      "Cocoa powder",
      "All-purpose flour",
      "Butter",
      "Sugar",
      "Eggs",
      "Vanilla extract",
      "Baking powder",
      "Salt",
      "Dark chocolate chips",
      "Milk chocolate chips",
    ],
  },
  {
    id: "oatmeal-raisin",
    name: "Oatmeal Raisin Bliss",
    price: 179,
    rating: 4.7,
    reviews: 201,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=480&q=80",
    description: "Wholesome oatmeal cookies with plump raisins and a hint of cinnamon.",
    ingredients: [
      "Rolled oats",
      "All-purpose flour",
      "Butter",
      "Brown sugar",
      "Eggs",
      "Vanilla extract",
      "Baking soda",
      "Cinnamon",
      "Salt",
      "Raisins",
    ],
  },
  {
    id: "sugar-cookies",
    name: "Decorated Sugar Cookies",
    price: 229,
    rating: 4.9,
    reviews: 267,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=480&q=80",
    description: "Beautifully decorated sugar cookies perfect for any celebration.",
    ingredients: [
      "All-purpose flour",
      "Butter",
      "Sugar",
      "Eggs",
      "Vanilla extract",
      "Baking powder",
      "Salt",
      "Royal icing",
      "Food coloring",
      "Edible glitter",
    ],
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin Cookies",
    price: 139,
    rating: 4.7,
    reviews: 178,
    bestseller: false,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=480&q=80",
    description: "Fresh blueberry cookies with a muffin-like texture and bursts of flavor.",
    ingredients: [
      "All-purpose flour",
      "Butter",
      "Sugar",
      "Eggs",
      "Vanilla extract",
      "Baking powder",
      "Salt",
      "Fresh blueberries",
      "Lemon zest",
      "Milk",
    ],
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

// Product Detail Modal Component
function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="product-modal">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="modal-description">{product.description}</p>

            <div className="modal-rating">
              <StarIcon />
              <span>{product.rating}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>

            <div className="modal-price">{formatPrice(product.price)}</div>

            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <button className="modal-add-to-cart" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Cookies() {
  const [cookies, setCookies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const cardRefs = useRef([]);

  // Simulate API call with mock cookie data
  useEffect(() => {
    const fetchCookies = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCookies(COOKIE_API);
      } catch (err) {
        console.error("Error fetching cookies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, []);

  // Intersection Observer for animations
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
  }, [cookies]);

  const handleCardClick = (cookie) => {
    setSelectedProduct(cookie);
    setIsModalOpen(true);
  };

  const handleAddToCart = (cookie) => {
    addToCart({
      id: cookie.id,
      name: cookie.name,
      price: cookie.price,
      image: cookie.image,
      quantity: 1,
    });

    setAddedId(cookie.id);

    window.setTimeout(() => {
      setAddedId((current) =>
        current === cookie.id ? null : current
      );
    }, 1600);
  };

  const handleModalAddToCart = (cookie) => {
    handleAddToCart(cookie);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <section className="cookies" id="cookies">
        <div className="cookies__intro">
          <span className="cookies__eyebrow">Fresh From The Oven</span>
          <h2 className="cookies__heading">Featured Cookies</h2>
        </div>
        <div className="cookie-grid">
          <p style={{ textAlign: "center", color: "#c9ad8f", fontSize: "16px" }}>
            Loading delicious cookies...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="cookies" id="cookies">
        <div className="cookies__intro">
          <span className="cookies__eyebrow">Fresh From The Oven</span>
          <h2 className="cookies__heading">Featured Cookies</h2>
        </div>

        <div className="cookie-grid">
          {cookies.map((cookie, i) => (
            <div
              className="cookie-card"
              key={cookie.id}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ transitionDelay: `${i * 90}ms` }}
              onClick={() => handleCardClick(cookie)}
            >
              <div className="cookie-card__media">
                {cookie.bestseller && (
                  <span className="cookie-card__badge">Bestseller</span>
                )}
                <img
                  src={cookie.image}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(cookie);
                  }}
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

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleModalAddToCart}
      />
    </>
  );
}
