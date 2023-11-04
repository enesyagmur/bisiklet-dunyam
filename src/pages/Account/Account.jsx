import React, { useEffect, useState } from "react";
import "./account-styles/account.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import UserPersonel from "./account-components/UserPersonel";
import UserAdress from "./account-components/UserAdress";
import UserOrders from "./account-components/UserOrders";
import UserFavorites from "./account-components/userFavorites";
import { FaUserAlt } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { RiBillFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import toast from "react-hot-toast";

const Account = () => {
  const [dropdownShow, setDropdownShow] = useState(0);
  const [activeUser, setActiveUser] = useState();

  const navigate = useNavigate();

  //şu an da oturum açmış kullanıcıyı alma
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setActiveUser(user);
    } else {
      navigate("/login");
    }
  });

  //çıkış fonksiyonu
  const logoutFunc = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success(`çıkış yapıldı.`, {
          style: {
            border: "1px solid #82827d",
            padding: "16px",
            color: "#121212",
          },
          iconTheme: {
            primary: "#e6e6e5",
            secondary: "#121212",
          },
        });
      })
      .catch((err) => {
        toast.error(err, {
          style: {
            border: "1px solid #b12718",
            padding: "16px",
            color: "#b12718",
          },
          iconTheme: {
            primary: "#b12718",
            secondary: "#e6e6e5",
          },
        });
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
          <p onClick={() => setDropdownShow(1)}>
            <RiProfileFill className="account-icon" /> Bilgilerim
          </p>
          <p className="" onClick={() => setDropdownShow(2)}>
            <HiLocationMarker className="account-icon" /> Adreslerim
          </p>
          <p onClick={() => setDropdownShow(3)}>
            <RiBillFill className="account-icon" /> Siparişlerim
          </p>
          <p onClick={() => setDropdownShow(4)}>
            <MdFavorite className="account-icon" /> Favorilerim
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
