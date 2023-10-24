import React from "react";
import "../styles/components-style/header.css";
import logo from "../images/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

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
    } else {
      navigate(`/${where}`);
    }
  };

  const alert = () => {
    toast("Hello World");
  };

  return (
    <div className="header">
      <div className="header-top">
        <motion.img
          src={logo}
          alt=""
          className="bike"
          animate={{
            x: 1540,
            rotate: -20,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>
      <div className="header-bottom">
        <p className="logo" onClick={() => go("")}>
          BISIKLET DUNYAM
        </p>
        <div className="header-links">
          <p onClick={alert}>ANASAYFA</p>
          <p onClick={() => go("products")}>ÜRÜNLER</p>
          <p onClick={() => go("contact")}>İLETİŞİM</p>
          <p onClick={() => go("account")}>HESAP</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
