import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import "./DetailPage.css";

import Axios from "../../api/Axios";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductList from "../../components/ProductList/ProductList";
import { addCart } from "../../reducer/cartReducer";
import { formatPrice, toastNoti } from "../../utils/utils";
import { baseImgUrl } from '../../constants/baseImgUrl'


const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // call api get data
  const getData = async () => {
    try {
      const res = await Axios.get(
        `/product/detail/${id}`
      );
      if (res.status === 200) {
        setData(res.data);
        getRelated(res.data.category, res.data._id)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getRelated = async (type, id) => {
    try {
      const res = await Axios.get(
        `/product/category?type=${type}`
      );
      if (res.status === 200) {
        const data = res.data.results.filter(item => item._id !== id)
        setRelated(data)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // onchange quantity input
  const onChangeQuantity = (e) => {
    if (e.target.value < 0) {
      toastNoti("Item quantity can't small than 0!", "error")
      return setQuantity(0);
    }
    if (e.target.value > data.stock) {
      toastNoti("Item quantity can't larger than stock!", "error")
      return setQuantity(data.stock);
    }
    setQuantity(e.target.value);
  };

  // onchange quantity button
  const onClickChangeQuantity = (type) => {
    if (quantity < 1 && type === "dec") {
      toastNoti("Item quantity can't small than 0!", "error")
      setQuantity(0);
      return;
    }

    if (quantity >= data.stock && type === "inc") {
      toastNoti("Item quantity can't larger than stock!", "error")
      setQuantity(0);
      return;
    }
    const quantityChange = quantity
    console.log(quantityChange);
    type === "inc"
      ? setQuantity(Number(quantityChange) + 1)
      : setQuantity(Number(quantityChange) - 1);
  };

  //navigate
  const detailProduct = (item) => {
    navigate(`/detail/${item._id}`);
  };

  // add item to cart
  const handdleAddItem = () => {
    const addItem = { ...data };
    addItem.amount = quantity;
    dispatch(addCart({ item: addItem }));
    toastNoti(
      `Add success ${quantity} item${quantity === 1 ? "" : "s"}`,
      "success"
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="detail-page">
          {data && (
            <>
              <div className="detail-item">
                <div className="detail-img">
                  <img src={`${baseImgUrl}/${data.images[0]}`} alt={data.category} />
                </div>
                <div className="detail-info">
                  <h1>{data.name}</h1>
                  <p className="price">{formatPrice(data.price)}</p>
                  <p className="short-desc">{data.shortDesc}</p>
                  <h3 className="category">
                    CATEGORY: <span>{data.category}</span>
                  </h3>
                  <p>Stock: {data.stock}</p>
                  <div className="quantity">
                    <div className="input-number">
                      <p>QUANTITY</p>
                      <button
                        type="button"
                        onClick={() => onClickChangeQuantity("dec")}
                      >
                        <FontAwesomeIcon icon={faCaretLeft} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={onChangeQuantity}
                      />
                      <button
                        type="button"
                        onClick={() => onClickChangeQuantity("inc")}
                      >
                        <FontAwesomeIcon icon={faCaretRight} />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="add"
                      onClick={handdleAddItem}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="detail-long-desc">
                <button type="button">DESCRIPTION</button>
                <h2>PRODUCT DESCRIPTION</h2>
                <p>{data.longDesc}</p>
              </div>

              {related.length > 0 && (
                <div className="related-products">
                  <h2>RELATED PRODUCTS</h2>
                  <ProductList
                    data={related}
                    onClick={detailProduct}
                    className="related-list"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
