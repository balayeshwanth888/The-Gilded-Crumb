import { FaTimes } from "react-icons/fa";
import { useCart } from "./CartContext";
import "../styles/Cart.css";

export default function Cart() {
  const {
    cart,
    totalPrice,
    removeItem,
    increaseQty,
    decreaseQty,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <div className={`cart ${isCartOpen ? "show" : ""}`}>
      <div className="cart-header">
        <h2>🛒 Shopping Cart</h2>

        <button
          className="close-btn"
          onClick={() => setIsCartOpen(false)}
        >
          <FaTimes size={24} />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your Cart is Empty</h3>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-info">
                  <h4>{item.name}</h4>

                  <p>₹{item.price}</p>

                  <div className="qty">

                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      +
                    </button>

                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total</h3>

            <h2>₹{totalPrice}</h2>

            <button className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}