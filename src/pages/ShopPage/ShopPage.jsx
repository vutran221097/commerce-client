import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ShopPage.css";

import Axios from '../../api/Axios'
import Navbar from "../../components/Navbar/Navbar.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ProductList from "../../components/ProductList/ProductList";
import categories from "../../assets/jsondata/categories.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


const ShopPage = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [sortValue, setSortValue] = useState('default')

  const getData = async (pageNumber, sort) => {
    try {
      const res = await Axios.get(
        `/product/all?page=${pageNumber}${sort ? `&sortByPrice=${sort}` : ""}`
      );
      if (res.status === 200) {
        setData(res.data.results);
        setTotalPage(res.data.total_pages)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onHandlePage = (e) => {
    if (page === 0) return;
    let newPage
    if (e === 'next') {
      newPage = page + 1
      setPage(newPage)
    } else {
      newPage = page - 1
      setPage(newPage)
    }
    if (category === 'all') {
      sortValue === 'default' ? getData(newPage) : getData(newPage, sortValue === 'low' ? 1 : -1)
    } else {
      sortValue === 'default' ? getDataByCategory(category, newPage) : getDataByCategory(category, newPage, sortValue === 'low' ? 1 : -1)
    }
  }

  const getDataByCategory = async (category, pageNumber, sort) => {
    try {
      const res = await Axios.get(
        `/product/category?type=${category}&page=${pageNumber}${sort ? `&sortByPrice=${sort}` : ""}`
      );
      if (res.status === 200) {
        setData(res.data.results);
        setTotalPage(res.data.total_pages)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    category === 'all' ? getData(1) : getDataByCategory(category, 1)
    // eslint-disable-next-line
  }, []);

  // change category
  const changeCategory = (category) => {
    // setSearchText("")
    setPage(1)
    navigate(`/shop/${category}`)
    if (category === "all") {
      getData(1)
      return;
    }

    getDataByCategory(category, 1)
  };



  // sort data
  const sortData = (e) => {
    setSortValue(e.target.value)
    switch (e.target.value) {
      case "low":
        category === 'all' ? getData(1, 1) : getDataByCategory(category, 1, 1)
        break;
      case "high":
        category === 'all' ? getData(1, -1) : getDataByCategory(category, 1, -1)
        break;
      default:
        category === 'all' ? getData(1) : getDataByCategory(category, 1)
        return;
    }
  };

  // navigate
  const detailProduct = (item) => {
    navigate(`/detail/${item._id}`);
  };

  // onchange searching input
  // const onChangeSearch = (e) => {
  //   setSearchText(e.target.value);
  // };

  return (
    <div>
      <Navbar />
      <Banner type="shop" />
      <div className="container">
        <div className="shop-container">
          <div className="shop-categories">
            {categories.map((v, i) => {
              return (
                <div className={v.title === "APPLE" ? "bg-black" : ""} key={i}>
                  <h2>{v.title}</h2>
                  {v.item.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className={`shop-categories-item ${category === value.toLocaleLowerCase() ? "active" : ""
                          }`}
                        onClick={() => changeCategory(value.toLocaleLowerCase())}
                      >
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="shop-category-item">
            <div className="shop-filter">
              {/* <input
                type="text"
                placeholder="Enter Search Here!"
                onChange={onChangeSearch}
                value={searchText}
              /> */}
              <div></div>
              <select
                name="sort"
                id="sort"
                onChange={sortData}
                value={sortValue}
              >
                <option value="default">Default sorting</option>
                <option value="low">From low to high</option>
                <option value="high">From high to low</option>
              </select>
            </div>
            {data.length ? (
              <>
                <ProductList
                  data={data}
                  onClick={detailProduct}
                  className="shop-item"
                />
                <div className="paging">
                  {page !== 1 && <FontAwesomeIcon className='icon' onClick={() => onHandlePage('back')} icon={faChevronLeft} />}
                  <p>Page {page}</p>
                  {page !== totalPage && <FontAwesomeIcon className='icon' onClick={() => onHandlePage('next')} icon={faChevronRight} />}
                </div>
              </>
            ) : (<p className="empty">No product available!</p>)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
