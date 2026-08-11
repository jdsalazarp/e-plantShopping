import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem({
  item,
  cartItems = [],
  onContinueShopping,
  onCheckout,
}) {
  const dispatch = useDispatch();

  const itemTotal = item.price * item.quantity;

  const cartTotal = cartItems.reduce(
    (total, cartItem) =>
      total + cartItem.price * cartItem.quantity,
    0
  );

  const increaseQuantity = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const deleteItem = () => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      alert("Coming Soon");
    }
  };

  return (
    <article className="cart-item">
      <img
        src={item.image}
        alt={item.name}
      />

      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <p>
          Unit Price:{" "}
          <strong>${item.price.toFixed(2)}</strong>
        </p>

        <div className="quantity-controls">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            -
          </button>

          <span>
            Quantity: {item.quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>

        <p>
          Item Total:{" "}
          <strong>${itemTotal.toFixed(2)}</strong>
        </p>

        <button
          type="button"
          className="delete-button"
          onClick={deleteItem}
        >
          Delete
        </button>
      </div>

      {cartItems.length > 0 &&
        cartItems[cartItems.length - 1].id === item.id && (
          <div className="cart-summary">
            <h2>
              Total: ${cartTotal.toFixed(2)}
            </h2>

            <div className="cart-buttons">
              <button
                type="button"
                className="secondary-button"
                onClick={onContinueShopping}
              >
                Continue Shopping
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
    </article>
  );
}

export default CartItem;
