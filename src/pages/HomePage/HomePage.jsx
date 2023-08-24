import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Axios from '../../api/Axios.jsx'

// import components
import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import Contact from "../../components/Contact/Contact.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import DetailPopup from "../../components/DetailPopup/DetailPopup.jsx";

// import css
import "./HomePage.css";

// import image
import iphone from "../../assets/category/iphone.png";
import mac from "../../assets/category/mac.png";
import ipad from "../../assets/category/ipad.png";
import watch from "../../assets/category/watch.png";
import airpods from "../../assets/category/airpods.png";
import { showPopup } from "../../reducer/popupReducer.jsx";
import ProductItem from "../../components/ProductItem/ProductItem.jsx";

const data = [
  {
    image: iphone,
    category: "iphone",
  },
  {
    image: mac,
    category: "mac",
  },
  {
    image: ipad,
    category: "ipad",
  },
  {
    image: watch,
    category: "watch",
  },
  {
    image: airpods,
    category: "airpods",
  },
];

// first line data
const newData1 = data.slice(0, 2);
// second line data
const newData2 = data.slice(-3);

const HomePage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // navigate
  const directToShop = (category) => {
    navigate(`/shop/${category}`);
  };

  // call api to get data
  const getData = async () => {
    try {
      const res = await Axios.get("/product/all?limit=8");
      if (res.status === 200) {
        setData(res.data.results);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // call redux to show popup modal
  const onClick = (v) => {
    dispatch(showPopup({ item: v }));
  };
  return (
    <div>
      <Navbar />
      <Banner type="home" />
      {/* Browse categories */}
      <div className="container">
        <div className="browse-categories">
          <div className="browse-categories-header">
            <p>CAREFULLY CREATED COLLECTIONS</p>
            <h2>BROWSE OUR CATEGORIES</h2>
          </div>
          {/* first line render */}
          <div className="browse-categories-item">
            {newData1.map((v, i) => {
              return (
                <div onClick={() => directToShop(v.category)} key={i}>
                  <img src={v.image} alt={v.category} />
                </div>
              );
            })}
          </div>
          {/* second line render */}
          <div className="browse-categories-item">
            {newData2.map((v, i) => {
              return (
                <div onClick={() => directToShop(v.category)} key={i}>
                  <img src={v.image} alt={v.category} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Trending */}
      <div className="container">
        <div className="top-trending">
          <div className="top-trending-header">
            <p>MADE THE HARD WAY</p>
            <h2>TOP TRENDING PRODUCTS</h2>
          </div>

          <div className="top-trending-list mb-2">
            {data &&
              data.slice(0, 4).map((v, i) => {
                return (
                  <ProductItem
                    key={i}
                    item={v}
                    onClick={() => onClick(v)}
                    className="top-trending-item"
                  />
                );
              })}
          </div>

          <div className="top-trending-list">
            {data &&
              data.slice(4, 8).map((v, i) => {
                return (
                  <ProductItem
                    key={i}
                    item={v}
                    onClick={() => onClick(v)}
                    className="top-trending-item"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
      <DetailPopup />
    </div>
  );
};

export default HomePage;
