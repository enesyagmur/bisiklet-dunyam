import React, { useEffect, useState } from "react";
import "../account-styles/userorders.css";
import { BiArrowBack } from "react-icons/bi";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { RiBillFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const UserOrders = ({ dropdownShow, setDropdownShow }) => {
  const [userOrders, setUserOrders] = useState("");
  const navigate = useNavigate();

  const getCurrentUserOrdersFunc = async () => {
    const ordersData = await getDocs(collection(db, "orders"));
    const orders = ordersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const newArray = orders.filter(
      (order) => order.orderCreaterId === auth.currentUser.uid
    );

    if (newArray) {
      setUserOrders(newArray);
    }
  };

  useEffect(() => {
    getCurrentUserOrdersFunc();
  }, []);

  return (
    <div
      className={
        dropdownShow === 3 ? "userorders active" : "userorders inactive"
      }
    >
      <div className="user-orders-title">
        <p className="back-button">
          <BiArrowBack onClick={() => setDropdownShow(0)} />
        </p>
        <RiBillFill />
        <p className="title">Siparişlerim</p>
      </div>
      {/* Order List-----------------------------------------------------  */}
      <div className="order-list">
        {userOrders ? (
          userOrders.map((order) => (
            <div
              className="order"
              onClick={() => navigate(`/userorderdetail/${order.orderNumber}`)}
            >
              <p className="orderNumber">
                Sipariş numarası #{order.orderNumber}
              </p>
              <p className="orderDate">{order.orderCreateTime}</p>
            </div>
          ))
        ) : (
          <p>Siparişiniz Bulunmuyor</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
