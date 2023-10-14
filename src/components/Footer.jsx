import React from "react";
import "../styles/components-style/footer.css";
import logo from "../images/logo.png";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-main-logo">
          <img src={logo} alt="" />
        </div>
        <div className="footer-main-about">
          <p>İade Politikası</p>
          <p>Hakkımızda</p>
          <p>İstek Listesi</p>
        </div>
        <div className="footer-main-contact">
          <p>0543 276 95 24</p>
          <p>bisikletdunyam@gmmail.com</p>

          <p>Yenimahalle, Mektep Arkası Sk. No: 17D, 34142 Bakırköy/İstanbul</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-bottom-logo">BİSİKLET DÜNYAM</p>
        <p className="footer-bottom-social">
          <BsInstagram className="icon" /> <BsFacebook className="icon" />{" "}
          <BsTwitter className="icon" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
