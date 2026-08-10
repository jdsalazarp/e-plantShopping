import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/CartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const total = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>Unit price: ${item.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>
            -
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => dispatch(increaseQuantity(item.id))}>
            +
          </button>
        </div>

        <p>
          Total: <strong>${total.toFixed(2)}</strong>
        </p>

        <button
          className="delete-button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;
