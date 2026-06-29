import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Cookies from "./components/Cookies";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

import CartProvider from "./components/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <Features />
      <Cookies />
      <Reviews />
      <Footer />
    </CartProvider>
  );
}

export default App;