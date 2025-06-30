import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const PlaceOrder = () => {
  const { getTotalCartAmount, food_list, cartItems, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    zip_code: "",
    country: "",
    phone: "",
    city: "",
    state: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    if (!/^\d{6}$/.test(data.zip_code)) {
      setError("Please enter a valid 6-digit zip code.");
      return false;
    }
    if (!/^\d{10}$/.test(data.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    setError("");
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20
    };
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      const { session_url } = response.data;
      window.location.replace(session_url);
    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="place-order" autoComplete="on">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="first_name" value={data.first_name} onChange={onChangeHandler} type="text" placeholder="First Name" autoFocus />
          <input required name="last_name" value={data.last_name} onChange={onChangeHandler} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zip_code" value={data.zip_code} onChange={onChangeHandler} type="text" placeholder="Zip Code" maxLength={6} />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" maxLength={10} />
        {error && <div className="place-order-error">{error}</div>}
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button type='submit' disabled={loading}>
            {loading ? <Loader text="Redirecting..." /> : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
