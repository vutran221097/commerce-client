import React from "react";
import "./ProductList.css";

import ProductItem from "../ProductItem/ProductItem";

const ProductList = (props) => {
  const { data, onClick, title, className } = props;
  return (
    <div>
      {title && <h1>{title}</h1>}
      <div className={`products ${className ? className : ""}`}>
        {data.map((item, index) => {
          return (
            <ProductItem
              item={item}
              key={index}
              onClick={() => onClick(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
