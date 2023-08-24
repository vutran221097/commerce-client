import React from "react";
import "./ProductItem.css";
import { formatPrice } from "../../utils/utils";
import { baseImgUrl } from '../../constants/baseImgUrl'

const ProductItem = (props) => {
  const { item, onClick, className } = props;
  return (
    <div className={`product-item ${className ? className : ""}`}>
      <div className="image">
        <img src={`${baseImgUrl}/${item.images[0]}`} alt={item.category} onClick={() => onClick()} />
      </div>
      <h3>{item.name}</h3>
      <p>
        {formatPrice(item.price)}
      </p>
    </div>
  );
};

export default ProductItem;
