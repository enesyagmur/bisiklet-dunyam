import React, { useEffect, useState } from "react";
import "../account-styles/userorders.css";
import { BiArrowBack } from "react-icons/bi";
import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { RiBillFill } from "react-icons/ri";

const UserOrders = ({ dropdownShow, setDropdownShow }) => {
  const [userOrders, setUserOrders] = useState("");
  const [order, setOrder] = useState();
  const [openOrderDetail, setOpenOrderDetail] = useState(false);

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

  const showOrderDetailFunc = (order) => {
    setOpenOrderDetail(true);
    setOrder(order);
  };

  const backFunc = () => {
    if (openOrderDetail === true) {
      setOpenOrderDetail(false);
    } else {
      setDropdownShow(0);
    }
  };

  return (
    <div
      className={
        dropdownShow === 3 ? "userorders active" : "userorders inactive"
      }
    >
      <div className="user-orders-title">
        <p className="back-button">
          <BiArrowBack onClick={backFunc} />
        </p>
        <RiBillFill />
        <p className="title">Siparişlerim</p>
      </div>
      {/* Order List-----------------------------------------------------  */}
      <div className={openOrderDetail ? "inactive" : "order-list"}>
        {userOrders ? (
          userOrders.map((order) => (
            <div className="order" onClick={() => showOrderDetailFunc(order)}>
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

      {/* Order detay ----------------------------------------------- */}
      {order ? (
        <div className={openOrderDetail ? "account-order-detail" : "inactive"}>
          <div className="order-detail-title">
            <p className="orderNumber">Sipariş numarası #{order.orderNumber}</p>
            <p className="orderDate"> Tarih : {order.orderCreateTime}</p>
          </div>
          <div className="order-detail-products">
            {order.orderProducts.map((order) => (
              <div className="order-detail-single-order">
                <img src={order.productImage} alt="" />
                <p>{order.productName}</p>
                <p>{order.productPrice} TL</p>
              </div>
            ))}
          </div>
          <div className="order-detail-adress">
            <p>
              Sokak : {order.orderAdress[0].adressStreet} / Bina:{" "}
              {order.orderAdress[0].adressBuild} / Daire :{" "}
              {order.orderAdress[0].adressHouse} / Mahalle :{" "}
              {order.orderAdress[0].adressNeighborhood} / Semt :{" "}
              {order.orderAdress[0].adressCountry} / Şehir :{" "}
              {order.orderAdress[0].adressCity} / Tarif:{" "}
              {order.orderAdress[0].adressDescription}
            </p>
            <p>Telefon :{order.orderAdress[0].userPhone}</p>
          </div>
          <p className="order-detail-total">Toplam : {order.orderTotal} TL</p>
        </div>
      ) : null}
    </div>
  );
};

export default UserOrders;
