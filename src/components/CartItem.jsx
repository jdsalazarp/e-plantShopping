import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const itemTotal = item.price * item.quantity;

  const increaseQuantity = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQuantity = () => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const deleteItem = () => {
    dispatch(removeItem(item.id));
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
          Unit price: ${item.price.toFixed(2)}
        </p>

        <div className="quantity-controls">
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>

        <p>
          Total:{" "}
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
    </article>
  );
}

export default CartItem;
