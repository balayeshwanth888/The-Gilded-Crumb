import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Cookies from "./components/Cookies";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

import CartProvider from "./components/CartContext";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Cookies />
      <Reviews />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
