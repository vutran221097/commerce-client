import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

// import css
import "./DetailPopup.css";

import { hidePopup } from "../../reducer/popupReducer";
import { formatPrice } from "../../utils/utils";
import { baseImgUrl } from '../../constants/baseImgUrl'


// style for modal
const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, 0)",
    width: "75%",
    padding: "0",
  },
};

const DetailPopup = () => {
  const isOpen = useSelector((state) => state.popup.isOpen);
  const item = useSelector((state) => state.popup.currentItem);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(hidePopup());
  };

  const viewDetail = () => {
    navigate(`/detail/${item._id}`)
    dispatch(hidePopup());
  };

  if(!isOpen) return;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal-item">
          <div className="modal-image">
            <img src={`${baseImgUrl}/${item.images[0]}`} alt={item.category} />
          </div>
          <div className="modal-content">
            <div className="modal-close-btn">
              <button onClick={() => closeModal()}>&#10005;</button>
            </div>
            <div className="modal-info">
              <h2>{item.name}</h2>
              <p className="price">
                {formatPrice(item.price)}
              </p>
              <p className="description">{item.shortDesc}</p>
              <button onClick={() => viewDetail()}>
                <FontAwesomeIcon className="icon" icon={faCartShopping} />{" "}
                View Detail{" "}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );

};

export default DetailPopup;
