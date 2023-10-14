import React, { useState } from "react";
import "./account-styles/account.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import UserPersonel from "./account-components/UserPersonel";
import UserAdress from "./account-components/UserAdress";
import UserOrders from "./account-components/UserOrders";
import UserFavorites from "./account-components/userFavorites";
import { FaUserAlt } from "react-icons/fa";

const Account = () => {
  const [dropdownShow, setDropdownShow] = useState(0);

  const navigate = useNavigate();

  //çıkış fonksiyonu
  const logoutFunc = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="account">
      <Header />

      <div className="account-body">
        <div className="account-user-logo">
          <FaUserAlt className="account-user-logo-icon" />
        </div>

        <div
          className={
            dropdownShow === 0 ? "user-info active" : "user-info inactive"
          }
        >
          <p className="user-personel" onClick={() => setDropdownShow(1)}>
            Bilgilerim
          </p>
          <p className="user-adress" onClick={() => setDropdownShow(2)}>
            Adreslerim
          </p>
          <p className="user-orders" onClick={() => setDropdownShow(3)}>
            Siparişlerim
          </p>
          <p className="user-favorites" onClick={() => setDropdownShow(4)}>
            Favorilerim
          </p>
        </div>

        <UserPersonel
          dropdownShow={dropdownShow}
          setDropdownShow={setDropdownShow}
        />

        <UserAdress
          dropdownShow={dropdownShow}
          setDropdownShow={setDropdownShow}
        />

        <UserOrders
          dropdownShow={dropdownShow}
          setDropdownShow={setDropdownShow}
        />

        <UserFavorites
          dropdownShow={dropdownShow}
          setDropdownShow={setDropdownShow}
        />
        <button
          className={dropdownShow === 0 ? "logout-btn" : "inactive"}
          onClick={logoutFunc}
        >
          Çıkış
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
