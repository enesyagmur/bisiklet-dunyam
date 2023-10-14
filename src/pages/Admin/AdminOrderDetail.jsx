import React, { useEffect, useState } from "react";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminorderdetail.css";
import AdminPanel from "./AdminPanel";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

const AdminOrderDetail = () => {
  const [order, setOrder] = useState();
  const { ordernumber } = useParams();

  const getAllOrdersFunc = async () => {
    try {
      const ordersData = await getDocs(collection(db, "orders"));
      const orders = ordersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const chosenOrder = orders.find(
        (element) => Number(element.orderNumber) === Number(ordernumber)
      );

      if (chosenOrder) {
        setOrder(chosenOrder);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAllOrdersFunc();
  }, []);

  console.log(order);

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        {order ? (
          <div className="order-detail">
            <div className="order-detail-info">
              <p className="order-detail-number">#{order.orderNumber}</p>
              <p className="order-detail-total">{order.orderTotal}TL</p>
            </div>
            <div className="order-detail-product-list">
              {order.orderProducts.map((product) => (
                <div className="order-product">
                  <p className="order-product-name">{product.productName}</p>
                  <p className="order-product-price">
                    {product.productPrice}TL
                  </p>
                  <p className="order-product-count">1x</p>
                </div>
              ))}
            </div>

            <div className="order-detail-adress">
              <p> {order.orderAdress[0].adressTitle} </p>
              <p>
                {order.orderAdress[0].adressStreet} /
                {order.orderAdress[0].adressBuild} /{" "}
                {order.orderAdress[0].adressHouse} /
                {order.orderAdress[0].adressNeighborhood} /{" "}
                {order.orderAdress[0].adressCountry} /
                {order.orderAdress[0].adressCity} /{" "}
                {order.orderAdress[0].adressDescription}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminOrderDetail;
