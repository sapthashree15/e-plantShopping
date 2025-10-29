import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/cartSlice";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // ✅ Calculate total cost per item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace("$", ""));
    return (cost * item.quantity).toFixed(2);
  };

  // ✅ Calculate total cart amount
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const cost = parseFloat(item.cost.replace("$", ""));
        return total + cost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // ✅ Increase item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ Decrease item quantity or remove if quantity = 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Continue shopping - navigate to product listing
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) onContinueShopping(e);
  };

  // ✅ Checkout button - alert placeholder
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert("Coming Soon!!");
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {/* ✅ Display each cart item */}
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-cost">{item.cost}</p>

              {/* ✅ Quantity controls */}
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>

              {/* ✅ Total for each item */}
              <p className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </p>

              {/* ✅ Delete button */}
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty!</p>
      )}

      {/* ✅ Display total cart amount */}
      {cart.length > 0 && (
        <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      )}

      {/* ✅ Action buttons */}
      <div className="cart-actions">
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
