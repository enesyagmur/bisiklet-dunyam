import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../Account/account-styles/userOrderDetail.css";
import { useParams } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";

const UserOrderDetail = () => {
  const { ordernumber } = useParams();
  const [orderInfo, setOrderInfo] = useState();
  const [InputReasonCancel, setInputReasonCancel] = useState("");

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

  const orderCancelFunc = async () => {
    const orderRef = doc(db, "orders", orderInfo.id);

    if (InputReasonCancel !== "") {
      await updateDoc(orderRef, {
        orderStatus: "Sipariş İptal Edildi",
        orderStatusDetail: "Sipariş İptal Edildi",
      });
      alert(
        "Sipariş iptal edildi. Değişikliği görüntülemek için sayfayı yenileyebilirsiniz."
      );
      getOrderFunc();
      setInputReasonCancel("");
    } else {
      alert("İptal Sebebi Giriniz");
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
              <p className="order-title-info">#{orderInfo.orderNumber}</p>
            </div>
            <div className="order-total">
              <p>Sipariş Toplamı</p> :
              <p className="order-title-info">{orderInfo.orderTotal} TL</p>
            </div>
            <div className="order-date">
              <p>Sipariş Tarihi</p> :
              <p className="order-title-info">{orderInfo.orderCreateTime}</p>
            </div>
            <div className="order-date">
              <p>Sipariş Durum</p> :
              <p className="order-title-info">{orderInfo.orderStatusDetail}</p>
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
          {orderInfo.orderStatus === "Sipariş İptal Edildi" ? null : (
            <div className="user-order-delete">
              <p>Siparişimi İptal Etmek İstiyorum</p>
              {orderInfo.orderStatus === "Sipariş kargoya verildi" ? (
                <p>
                  Kargoya teslim edilen siparişler iptal edilemez. Siparişiniz
                  teslim edildikten sonra iade kodu ile geri gönderebilirsiniz.
                </p>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="İptal Sebebi"
                    onChange={(e) => setInputReasonCancel(e.target.value)}
                  />
                  <button onClick={orderCancelFunc}>Sipariş İptal</button>
                </>
              )}
            </div>
          )}
        </div>
      ) : null}

      <Footer />
    </div>
  );
};

export default UserOrderDetail;
