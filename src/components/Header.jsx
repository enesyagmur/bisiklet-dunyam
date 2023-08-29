import React from "react";
import "../styles/components-style/header.css";
import { FiUser } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../images/racing-bike.png";
import dag1 from "../images/dag1.png";
import dag2 from "../images/dag2.png";

import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="header">
      <div className="header-top">
        <motion.img
          src={logo}
          alt=""
          className="bike"
          animate={{
            x: 1100,
            rotate: -20,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        <div className="header-icons">
          <FiUser className="icon" />
          <SlBasket className="icon" />
        </div>
      </div>
      <div className="header-bottom">
        <p className="logo">BİSİKLET DÜNYAM</p>
        <div className="header-links">
          <p>ANASAYFA</p>
          <p>ÜRÜNLER</p>
          <p>İLETİŞİM</p>
          <p>GALERİ</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
