import React from "react";
import "../styles/components-style/header.css";
import { FiUser } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";

import logo from "../images/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const basket = useSelector((state) => state.basket.basketProducts);

  // tıkladığın linke göre sayfa değiştiren fonksiyon (kullanıcı profili için özel koşul var)
  const go = (where) => {
    if (where === "account") {
      if (auth.currentUser) {
        navigate(`/${where}`);
      } else {
        navigate("/login");
      }
    } else if (where === "products") {
      const categoryName = "all";
      navigate(`/products/${categoryName}`);
    } else if (where === "basket") {
      if (basket.length === 0) {
        alert("sepetinizde ürün bulunmuyor");
      } else {
        navigate("/basket");
      }
    } else {
      navigate(`/${where}`);
    }
  };

  return (
    <div className="header">
      <div className="header-top">
        <motion.img
          src={logo}
          alt=""
          className="bike"
          animate={{
            x: 1400,
            rotate: -20,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />

        <div className="header-icons">
          <FiUser className="icon" onClick={() => go("account")} />
          <div className="basket-icon">
            <SlBasket className="icon" onClick={() => go("basket")} />
            <p className="basket-count">{basket.length}</p>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <p className="logo" onClick={() => go("")}>
          BISIKLET DUNYAM
        </p>
        <div className="header-links">
          <p onClick={() => go("")}>ANASAYFA</p>
          <p onClick={() => go("products")}>ÜRÜNLER</p>
          <p onClick={() => go("contact")}>İLETİŞİM</p>
          {/* <p onClick={() => go("adminorders")}>ADMİN</p> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
