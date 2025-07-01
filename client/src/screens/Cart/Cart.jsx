import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';

const Cart = () => {
  const { cartItems, menu, removeFromCart, getTotalCartAmount, url, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalCartAmount();
  const delivery = subtotal === 0 ? 0 : 20;
  const total = Math.max(0, subtotal + delivery - discount);

  const handlePromoApply = () => {
    if (promoApplied) return;
    if (promo.trim().toUpperCase() === "SAVE20") {
      setDiscount(20);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const handleProceed = () => {
    if (subtotal === 0) return;
    navigate('/order');
  };

  const cartItemsList = menu.filter(food => cartItems[food._id] > 0);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="food-image">Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Modify</p>
        </div>
        <br />
        <hr />
        {cartItemsList.length === 0 ? (
          <div className="cart-empty">
            <img src={assets.basket_icon} alt="Empty cart" />
            <p>Your cart is empty. Add some delicious food!</p>
            <button
              type="button"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const el = document.getElementById('explore-menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          cartItemsList.map((food) => (
            <React.Fragment key={food._id}>
              <div className="cart-items-title cart-items-item">
                <img className="food-image" src={url + "/uploads/images/" + food.image} alt={food.name} />
                <p>{food.name}</p>
                <p>₹{food.price}</p>
                <p>{cartItems[food._id]}</p>
                <p>₹{cartItems[food._id] * food.price}</p>
                <div className="food-item-counter cart-counter">
                  <img className='remove-icon' onClick={() => removeFromCart(food._id)} src={assets.remove_icon_red} alt="Remove" />
                  <p>{cartItems[food._id]}</p>
                  <img className='add-icon' onClick={() => addToCart(food._id)} src={assets.add_icon_green} alt="Add" />
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{delivery}</p>
            </div>
            {discount > 0 && (
              <>
                <hr />
                <div className="cart-total-details">
                  <p>Promo Discount</p>
                  <p>-₹{discount}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{total}</b>
            </div>
          </div>
          <button
            type="button"
            onClick={handleProceed}
            disabled={subtotal === 0}
            aria-disabled={subtotal === 0}
            className={subtotal === 0 ? "disabled" : ""}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promo}
              onChange={e => setPromo(e.target.value)}
              disabled={promoApplied}
              aria-label="Promo code"
            />
            <button
              type="button"
              onClick={handlePromoApply}
              disabled={promoApplied}
            >
              {promoApplied ? "Applied" : "Apply"}
            </button>
          </div>
          {promoError && <span className="cart-promocode-error">{promoError}</span>}
          {promoApplied && <span className="cart-promocode-success">Promo applied!</span>}
        </div>
      </div>
    </div>
  );
};

export default Cart;
