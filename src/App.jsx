import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import AboutUs from "./components/AboutUs";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          🌿 Paradise Nursery
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Plants</button>
          <button onClick={() => setPage("about")}>About Us</button>
          <button onClick={() => setPage("cart")}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <h1>Welcome to Paradise Nursery</h1>
                <p>
                  Discover beautiful indoor plants that bring nature,
                  freshness and beauty into your home.
                </p>

                <button
                  className="primary-button"
                  onClick={() => setPage("products")}
                >
                  Get Started
                </button>
              </div>
            </section>

            <AboutUs />
          </>
        )}

        {page === "products" && <ProductList />}

        {page === "about" && <AboutUs />}

        {page === "cart" && (
          <section className="cart-page">
            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <h2>Your cart is empty 🌱</h2>
                <p>Add some beautiful plants to your cart.</p>

                <button
                  className="primary-button"
                  onClick={() => setPage("products")}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="cart-summary">
                  <h2>Total: ${cartTotal.toFixed(2)}</h2>

                  <div className="cart-buttons">
                    <button
                      className="secondary-button"
                      onClick={() => setPage("products")}
                    >
                      Continue Shopping
                    </button>

                    <button
                      className="primary-button"
                      onClick={() =>
                        alert("Thank you for shopping at Paradise Nursery!")
                      }
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
