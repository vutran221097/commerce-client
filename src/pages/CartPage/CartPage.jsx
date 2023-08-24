import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCaretLeft,
  faCaretRight,
  faGift,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import "./CartPage.css";

import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { formatPrice, toastNoti } from "../../utils/utils";
import {
  addCart,
  deleteCart,
  removeCart,
} from "../../reducer/cartReducer";
import { baseImgUrl } from '../../constants/baseImgUrl'

const headerTable = [
  "IMAGE",
  "PRODUCT",
  "PRICE",
  "QUANTITY",
  "TOTAL",
  "REMOVE",
];

const CartPage = () => {
  // get data from redux
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // onchange quantity save to redux and local storage
  const onClickChangeQuantity = (item, type) => {
    const newItem = { ...item, amount: 1 };
    type === "inc"
      ? dispatch(addCart({ item: newItem }))
      : dispatch(removeCart(newItem));
  };

  // remove item form cart
  const onDeleteItem = (id) => {
    const deleteConfirm = window.confirm(
      "Are you sure you want to delete it ?"
    );

    if (deleteConfirm) {
      dispatch(deleteCart(id));
      toastNoti("Delete item success!", "success");
    }
  };

  return (
    <div>
      <Navbar />
      <Banner type="cart" />
      <div className="container">
        <h2>SHOPPING CART</h2>
        <div className="shopping-cart">
          <div className="shopping-cart-list">
            <div className="shopping-cart-list-header">
              {headerTable.map((v, i) => {
                return <h4 key={i}>{v}</h4>;
              })}
            </div>

            <div className="shopping-cart-list-items">
              {!cartItems.length ? (
                <h2>No item in your cart.</h2>
              ) : (
                <div>
                  {cartItems.map((v, i) => {
                    return (
                      <div className="list-cart" key={i}>
                        <div className="cart-item">
                          <img src={`${baseImgUrl}/${v.images[0]}`} alt={v.name} />
                        </div>
                        <h3 className="cart-item">{v.name}</h3>
                        <p className="cart-item">{formatPrice(v.price)}</p>
                        <div className="cart-item quantity">
                          <button
                            type="button"
                            onClick={() => onClickChangeQuantity(v._id, "dec")}
                          >
                            <FontAwesomeIcon icon={faCaretLeft} />
                          </button>
                          <input type="number" value={v.amount} disabled />
                          <button
                            type="button"
                            onClick={() => onClickChangeQuantity(v, "inc")}
                          >
                            <FontAwesomeIcon icon={faCaretRight} />
                          </button>
                        </div>
                        <p className="cart-item">
                          {formatPrice(v.price * v.amount)}
                        </p>
                        <div className="cart-item">
                          <button onClick={() => onDeleteItem(v._id)}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="delete-icon"
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="shopping-cart-list-actions">
              <p onClick={() => navigate("/shop/all")}>
                <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Continue shopping
              </p>
              {!!cartItems.length && (
                <p onClick={() => navigate("/checkout")}>
                  Proceed to checkout &nbsp;
                  <FontAwesomeIcon icon={faArrowRight} />
                </p>
              )}
            </div>
          </div>
          <div className="shopping-cart-total">
            <h2>CART TOTAL</h2>
            <div className="subtotal">
              <h3>SUBTOTAL</h3>
              <p>{formatPrice(totalAmount)}</p>
            </div>
            <div className="horizon-line"></div>
            <div className="total">
              <h3>TOTAL</h3>
              <p>{formatPrice(totalAmount)}</p>
            </div>
            <div className="coupon">
              <input type="text" placeholder="Enter your coupon" />
              <button type="button">
                <FontAwesomeIcon icon={faGift} className="coupon-icon" /> {"  "}
                Apply coupon
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
