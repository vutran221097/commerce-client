import React, { useState } from "react";
import "./Navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastNoti } from "../../utils/utils";
import { logOut } from "../../reducer/authReducer";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false)
  const isLogged = useSelector((state) => state.auth.isLogged);
  const numberCart = useSelector((state) => state.cart.items)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // navigate
  const handleNavigate = (path) => {
    navigate(path);
  };

  const signOut = () => {
    dispatch(logOut());
    toastNoti("Logout success!", "success");
  };

  const showChildrenNav = () => {
    setShowNav(!showNav)
  }

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-left">
          <p onClick={() => handleNavigate("/")}>Home</p>
          <p onClick={() => handleNavigate("/shop/all")}>Shop</p>
        </div>

        <div className="navbar-logo">
          <p>BOUTIQUE</p>
        </div>

        <div className="navbar-right">
          <p onClick={() => handleNavigate("/cart")} className="cart-navbar">
            <FontAwesomeIcon className="navbar-icon" icon={faCartShopping} />
            Cart
            {numberCart.length ? <span className="number-cart">{numberCart.length}</span> : <></>}
          </p>
          {isLogged ? (
            <>
              <div className="navnar-logged">
                <div onClick={showChildrenNav} className="username-navbar">
                  <p> <FontAwesomeIcon className="navbar-icon" icon={faUser} />
                    {currentUser.fullname}
                  </p>
                  {showNav && <span className="username-navbar-children" onClick={() => handleNavigate(`/history/${currentUser.id}`)}>History</span>}
                </div>
                <FontAwesomeIcon className="navbar-icon" icon={faCaretDown} />
              </div>
              <p onClick={signOut}>(Logout)</p>
            </>
          ) : (
            <p onClick={() => handleNavigate("/login")}>
              <FontAwesomeIcon className="navbar-icon" icon={faUser} />
              Login
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
