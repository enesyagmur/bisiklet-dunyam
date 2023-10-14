import React, { useEffect } from "react";
import "../Admin/adminStyles/adminpanel.css";
import { useNavigate } from "react-router-dom";
import { BiSolidPackage } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";

import { RiLogoutBoxLine } from "react-icons/ri";

import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

const AdminPanel = () => {
  // useEffect(() => {
  //   if (auth.currentUser.email !== "yakup@gmail.com") {
  //     logoutFunc();
  //   }
  // }, []);

  const navigate = useNavigate();
  const go = (where) => {
    navigate(`/${where}`);
  };

  const logoutFunc = async () => {
    signOut(auth)
      .then(() => {
        go("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="adminpanel">
      <div className="adminpanel-pages">
        <p onClick={() => go("adminorders")}>
          <BiSolidPackage /> Siparişler
        </p>
        <p onClick={() => go("adminproducts")}>
          <MdProductionQuantityLimits /> Ürünler
        </p>

        <p onClick={logoutFunc}>
          <RiLogoutBoxLine /> Çıkış
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
