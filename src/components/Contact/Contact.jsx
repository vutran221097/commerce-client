import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container">
      <div className="contact">
        <div className="contact-services">
          <div>
            <h2>FREE SHIPPING</h2>
            <p>Free shipping worldwide</p>
          </div>
          <div>
            <h2>24 X 7 SERVICES</h2>
            <p>Free shipping worldwide</p>
          </div>
          <div>
            <h2>FESTIVAL OFFER</h2>
            <p>Free shipping worldwide</p>
          </div>
        </div>
        <div className="contact-address">
          <div>
            <h1>LET'S BE FRIENDS!</h1>
            <p>Nisi nisi tempor consequat laboris nisi.</p>
          </div>
          <div>
            <input type="email" placeholder="Enter your email address" />
            <button>Subcribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
