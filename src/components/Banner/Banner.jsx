import React from "react";
import { useNavigate } from "react-router-dom";

// import css
import "./Banner.css";

// import image
import bannerImage from "../../assets/banner.png";
import defaultBanner from "../../assets/default-banner.png";

const Banner = (props) => {
  const { type } = props;
  const navigate = useNavigate();

  // navigate 
  const browseCollections = () => {
    navigate("/shop/all");
  };

  return (
    <div className="container">
      <div className="banner">
        <img src={type === "home" ? bannerImage : defaultBanner} alt="banner" />
        {type === "home" && (
          <div className="banner-text">
            <p>NEW INSPIRATION 2023</p>
            <h1>20% OFF ON NEW SEASON</h1>
            <button onClick={() => browseCollections()}>
              Browse collections
            </button>
          </div>
        )}
        {type !== "home" && (
          <div className="other-banner-text">
            <h2>{type.toUpperCase()}</h2>
            <p>
              <span>{type === "checkout" ? "HOME / CART / " : ""}</span>
              {type.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
