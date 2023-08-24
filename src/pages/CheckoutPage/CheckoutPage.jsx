import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./CheckoutPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";

import Axios from "../../api/Axios";
import { formatPrice, toastNoti, validateCheckOut } from "../../utils/utils";
import { resetCart } from "../../reducer/cartReducer";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLogged = useSelector((state) => state.auth.isLogged)
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const initState = {
    fullname: currentUser.fullname,
    email: currentUser.email,
    phone: currentUser.phone,
    address: "",
    payment: "default"
  }

  const [formData, setFormData] = useState(initState)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleOrder = async () => {
    try {
      if (!isLogged) {
        navigate('/login')
      }
      const formatCart = cart.map((item) => {
        return { item: item._id, amount: item.amount }
      })
      const data = {
        userId: currentUser.id,
        payment: formData.payment,
        totalPrice: totalAmount,
        cart: formatCart,
        formData: {
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone.toString(),
          address: formData.address
        }
      }

      const validate = validateCheckOut(data)
      if (validate) {
        const res = await Axios.post("/order/create", data)
        if (res.status === 200) {
          toastNoti("Place order success", "success")
          dispatch(resetCart())
          navigate("/history")
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Navbar />
      <Banner type="checkout" />
      <div className="container">
        <div className="checkout-page">
          <h2>BILLING DETAILS</h2>
          <div className="billing">
            <div className="billing-user-info">
              <div className="pr-5">
                <label>FULL NAME:</label>
                <input type="text" placeholder="Enter Your Full Name Here!" name="fullname" value={formData.fullname} onChange={onChange} />
              </div>
              <div className="pr-5">
                <label>EMAIL:</label>
                <input type="text" placeholder="Enter Your Email Here!" name="email" value={formData.email} onChange={onChange} />
              </div>
              <div className="pr-5">
                <label>PHONE NUMBER:</label>
                <input
                  type="number"
                  placeholder="Enter Your Phone Number Here!"
                  name="phone" value={formData.phone} onChange={onChange}
                />
              </div>
              <div className="pr-5">
                <label>ADDRESS:</label>
                <input type="text" placeholder="Enter Your Address Here!" name="address" value={formData.address} onChange={onChange} />
              </div>
              <div className="pr-5">
                <label>PAYMENT:</label>
                <select name="payment" value={formData.payment} onChange={onChange}>
                  <option value="default">PLEASE SELECT PAYMENT TYPE</option>
                  <option value="cash">CASH</option>
                  <option value="credit">CREDIT</option>
                </select>
              </div>

              <div>
                <button onClick={() => handleOrder()}>Place order</button>
              </div>
            </div>
            <div className="billing-total">
              <h2>YOUR ORDER</h2>
              <div className="billing-details">
                {cartItems.map((v, i) => {
                  return (
                    <div key={i}>
                      <div className="billing-detail-item">
                        <h3>{v.name}</h3>
                        <p>{formatPrice(v.price) + " x " + v.amount}</p>
                      </div>
                      <div className="horizon-line"></div>
                    </div>
                  );
                })}
              </div>
              <div className="billing-total-price">
                <h3>TOTAL</h3>
                <p>{formatPrice(totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
