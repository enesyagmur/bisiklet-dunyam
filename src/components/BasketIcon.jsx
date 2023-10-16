import React from "react";
import { SlBasket } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/components-style/basketicon.css";

const BasketIcon = () => {
  const navigate = useNavigate();

  const basket = useSelector((state) => state.basket.basketProducts);

  return (
    <div className="basket-icon">
      <SlBasket className="icon" onClick={() => navigate("basket")} />
      {basket.length > 0 ? (
        <p className="basket-count">{basket.length}</p>
      ) : null}
    </div>
  );
};

export default BasketIcon;
