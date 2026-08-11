import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const total = item.price * item.quantity;

  const changeQuantity = (newQuantity) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: newQuantity,
      })
    );
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <p>Unit price: ${item.price.toFixed(2)}</p>

        <div className="quantity-controls">
          <button
            onClick={() => changeQuantity(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => changeQuantity(item.quantity + 1)}
          >
            +
          </button>
        </div>

        <p>
          Total: <strong>${total.toFixed(2)}</strong>
        </p>

        <button
          className="delete-button"
          onClick={() => dispatch(removeItem(item.id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;
