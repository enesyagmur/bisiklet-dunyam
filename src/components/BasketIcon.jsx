import React from "react";
import { SlBasket } from "react-icons/sl";
import { SlBasketLoaded } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/components-style/basketicon.css";

const BasketIcon = () => {
  const navigate = useNavigate();

  const basket = useSelector((state) => state.basket.basketProducts);

  return (
    <div
      className={basket.length !== 0 ? "basket-icon" : "inactive"}
      onClick={() => navigate("/basket")}
    >
      {basket.length > 0 ? (
        <SlBasketLoaded className="icon" />
      ) : (
        <SlBasket className="icon" />
      )}
    </div>
  );
};

export default BasketIcon;
