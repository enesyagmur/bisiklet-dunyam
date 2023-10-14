import React, { useEffect, useState } from "react";
import "../account-styles/userorders.css";
import { BiArrowBack } from "react-icons/bi";
import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../Firebase";
const UserOrders = ({ dropdownShow, setDropdownShow }) => {
  const [userOrders, setUserOrders] = useState("");

  const getCurrentUserOrdersFunc = async () => {
    const ordersData = await getDocs(collection(db, "orders"));
    const orders = ordersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const newArray = orders.find(
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

        <p className="title">Siparişlerim</p>
      </div>

      <div className="order-list">
        {userOrders ? (
          <div className="order">
            <div className="order-number">
              <label htmlFor="">Sipariş Numarası :</label>
              {userOrders.orderNumber}
            </div>

            <div className="order-status">
              <label htmlFor=""> Sipariş Durumu : </label>
              {userOrders.orderStatus}
            </div>
            <div className="order-product-date">
              <label htmlFor=""> Sipariş Tarihi:</label>
              {userOrders.orderCreateTime}
            </div>

            <div className="order-product-info">
              <p className="order-product-name">
                {userOrders.orderProducts[0].productName}
              </p>
              <p className="order-product-price">
                {userOrders.orderProducts[0].productPrice} TL
              </p>
            </div>

            <div className="order-product-info">
              <p className="order-product-name">
                {userOrders.orderProducts[1].productName}
              </p>
              <p className="order-product-price">
                {userOrders.orderProducts[1].productPrice} TL
              </p>
            </div>

            <p className="order-total">{userOrders.orderTotal} TL</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserOrders;
