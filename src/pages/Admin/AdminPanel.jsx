import React, { useEffect } from "react";
import "../Admin/adminStyles/adminpanel.css";
import { useNavigate } from "react-router-dom";
import { BiSolidPackage } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsPlusSquareDotted } from "react-icons/bs";
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
        <div onClick={() => go("adminorders")}>
          <p>Sİparişler</p>
          <BiSolidPackage className="admin-panel-icon" />
        </div>
        <div onClick={() => go("adminproducts")}>
          <p>Ürünler</p>
          <MdProductionQuantityLimits className="admin-panel-icon" />
        </div>
        <div onClick={() => go("adminaddproduct")}>
          <p>Yeni Ürün</p>
          <BsPlusSquareDotted className="admin-panel-icon" />
        </div>

        <div onClick={logoutFunc}>
          <p>Çıkış</p>
          <RiLogoutBoxLine className="admin-panel-icon" />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
