import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../Account/account-styles/userOrderDetail.css";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

const UserOrderDetail = () => {
  const { ordernumber } = useParams();
  const [orderInfo, setOrderInfo] = useState();

  const getOrderFunc = async () => {
    const ordersData = await getDocs(collection(db, "orders"));
    const orders = ordersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const findOrder = orders.find(
      (order) => Number(order.orderNumber) === Number(ordernumber)
    );
    if (findOrder) {
      setOrderInfo(findOrder);
    }
  };

  useEffect(() => {
    getOrderFunc();
  }, []);

  return (
    <div className="user-order-detail">
      <Header />
      {orderInfo ? (
        <div className="order-detail">
          <div className="order-title">
            <div className="order-number">
              <p>Sipariş Numarası</p> :
              <p className="order-title-info">{orderInfo.orderNumber}</p>
            </div>
            <div className="order-total">
              <p>Sipariş Toplamı</p> :
              <p className="order-title-info">{orderInfo.orderTotal} TL</p>
            </div>
          </div>
          <div className="order-products">
            {orderInfo.orderProducts.map((product) => (
              <div className="single-order">
                <img src={product.productImage} alt="" />
                <p className="product-detail">{product.productDetail}</p>
                <p>{product.productPrice} TL</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
};

export default UserOrderDetail;
