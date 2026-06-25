import "../styles/footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2>🍪 The Gilded Crumb</h2>
          <p>
            Crafting gourmet cookies with premium ingredients,
            baked fresh daily and delivered with love.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#cookies">Cookies</a>
          <a href="#features">Why Choose Us</a>
          <a href="#reviews">Reviews</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt /> Hyderabad, India
          </p>

          <p>
            <FaPhoneAlt /> +91 78923 26888
          </p>

          <p>
            <FaEnvelope /> hello@gildedcrumb.com
          </p>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3>Join Our Cookie Club</h3>

          <p>
            Get exclusive offers and fresh cookie updates.
          </p>

          <div className="newsletter-box">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer-socials">
        <a href="#">
          <FaInstagram />
        </a>

        <a href="#">
          <FaFacebookF />
        </a>

        <a href="#">
          <FaTwitter />
        </a>
      </div>

      <div className="footer-bottom">
        © 2026 The Gilded Crumb. Crafted with ❤️ and freshly baked goodness.
      </div>
    </footer>
  );
}