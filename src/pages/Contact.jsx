import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/contact.css";
import dukkan from "../images/yakup-dukkan1.jpg";
import gmail from "../images/gmail.png";
import phone from "../images/phone-icon.png";
import location from "../images/location.png";
import Map from "../components/Map";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import ScrollButton from "../components/ScrollButton";

const Contact = () => {
  return (
    <div className="contact">
      <Header />
      <p className="contact-title">BİZE ULAŞIN</p>

      <div className="contact-main">
        <div className="contact-explain">
          <img src={dukkan} alt="" />
          <div>
            <p className="contact-explain-title">
              Bizim ile işbirliği, reklam, soru, öneri ve şikayet gibi konularda
              iletişim kanallarımızdan irtibat kurabilirsiniz.
            </p>
            <p className="contact-social">
              <BsInstagram className="icon" /> <BsFacebook className="icon" />{" "}
              <BsTwitter className="icon" />
            </p>
          </div>
        </div>
        <div className="contact-channels">
          <div className="contact-phone">
            <img src={phone} alt="" />
            <p>0543 276 95 24 </p>
          </div>
          <div className="contact-email">
            <img src={gmail} alt="" />

            <p>bisikletdunyam@gmmail.com</p>
          </div>
          <div className="contact-adress">
            <img src={location} alt="" />
            <p>
              Yenimahalle, Mektep Arkası Sk. No: 17D, 34142 Bakırköy/İstanbul
            </p>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <p className="contact-form-title">Bize Ulaşın</p>
        <div className="contact-form-user-info">
          <input
            type="text"
            placeholder="Konu Başlığı"
            className="contact-form-subject"
          />
          <input type="text" placeholder="İsim" className="contact-form-name" />
          <input
            type="text"
            placeholder="Email"
            className="contact-form-email"
          />
        </div>
        <input
          type="text"
          placeholder="Message"
          className="contact-form-message"
        />
        <div className="contact-form-agrement">
          <input type="checkbox" name="" id="" />
          <div className="contact-form-agrement-explain">
            Bu formu doldurarak bilgilerinizin bu web sitesi tarafından
            saklanmasını kabul etmiş olursunuz.
          </div>
        </div>
        <button className="contact-form-btn">Gönder</button>
      </div>
      <Map />
      <ScrollButton />
      <Footer />
    </div>
  );
};

export default Contact;
