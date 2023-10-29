import React, { useEffect, useState } from "react";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminorderdetail.css";
import AdminPanel from "./AdminPanel";
import { useParams } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import toast from "react-hot-toast";

const AdminOrderDetail = () => {
  const [order, setOrder] = useState();
  const { ordernumber } = useParams();
  const [orderStateChange, setOrderStateChange] = useState([
    false,
    false,
    false,
  ]);
  const [orderStateInput, setOrderStateInput] = useState();

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

  const updateOrderStatusFunc = async () => {
    const orderRef = doc(db, "orders", order.id);

    if (orderStateChange[0] === true) {
      await updateDoc(orderRef, { orderStatus: "Sipariş Hazırlanıyor" });
      alert(
        "Sipariş durumu: Sipariş Hazırlanıyor, olarak güncellendi. Değişikliği görüntülemek için sayfayı yenileyebilirsiniz."
      );
      toast.success(`Sepete eklendi.`, {
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
    }
    //sipariş iptali, kargoya verildi için input kontrolu
    else if (orderStateInput !== "") {
      if (orderStateChange[1] === true) {
        await updateDoc(orderRef, {
          orderStatus: `Sipariş kargoya verildi`,
          orderStatusDetail: `Siparişiniz kargoya verildi. Kargo takip numarası : ${orderStateInput}`,
        });

        setOrderStateInput("");
        toast.success(
          `Sipariş durumu kargoya verildi olarak güncellendi. Değişikliği görüntülemek için sayfayı yenileyebilirsiniz.`,
          {
            style: {
              border: "1px solid #82827d",
              padding: "16px",
              color: "#121212",
            },
            iconTheme: {
              primary: "#e6e6e5",
              secondary: "#121212",
            },
          }
        );
      } else if (orderStateChange[2] === true) {
        await updateDoc(orderRef, {
          orderStatus: `Sipariş İptal Edildi`,
          orderStatusDetail: `Siparişiniz ${orderStateInput} sebebi ile iptal edildi, üzgünüz.`,
        });
        setOrderStateInput("");
        toast.success(
          `Sipariş ${orderStateInput} sebebi ile iptal edildi. Değişikliği görüntülemek için sayfayı yenileyebilirsiniz.`,
          {
            style: {
              border: "1px solid #82827d",
              padding: "16px",
              color: "#121212",
            },
            iconTheme: {
              primary: "#e6e6e5",
              secondary: "#121212",
            },
          }
        );
      }
    }
    //sipariş durumlarından birini seçmesi için kontrol
    else if (
      orderStateChange[0] === false &&
      orderStateChange[1] === false &&
      orderStateChange[2] === false
    ) {
      toast.error(`Yapılacak işlem için seçim yapmalısınız.`, {
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
    }
  };

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        {order ? (
          <div className="admin-order-detail">
            <div className="admin-order-title">
              <div className="admin-order-number">
                <p>Sipariş Numarası</p> :
                <p className="admin-order-title-info">#{order.orderNumber}</p>
              </div>
              <div className="admin-order-total">
                <p>Sipariş Toplamı</p> :
                <p className="admin-order-title-info">{order.orderTotal} TL</p>
              </div>
              <div className="admin-order-date">
                <p>Sipariş Tarihi</p> :
                <p className="admin-order-title-info">
                  {order.orderCreateTime}
                </p>
              </div>
            </div>
            <div className="admin-order-products">
              {order.orderProducts.map((product) => (
                <div className="admin-single-order">
                  <img src={product.productImage} alt="" />
                  <p className="admin-product-detail">
                    {product.productDetail}
                  </p>
                  <p>{product.productPrice} TL</p>
                </div>
              ))}
            </div>
            <div className="admin-order-detail-adress">
              <p>Başlık : {order.orderAdress[0].adressTitle}</p>
              <p>
                {order.orderAdress[0].adressStreet} /
                {order.orderAdress[0].adressBuild} /{" "}
                {order.orderAdress[0].adressHouse} /
                {order.orderAdress[0].adressNeighborhood} /{" "}
                {order.orderAdress[0].adressCountry} /
                {order.orderAdress[0].adressCity} /{" "}
                {order.orderAdress[0].adressDescription}
              </p>
              <p>Telefon : {order.orderAdress[0].userPhone}</p>
            </div>
            <div className="admin-order-state">
              <p className="admin-order-state-title">
                Sipariş Durumu : {order.orderStatus}
              </p>
              {/* sipariş iptal edildi ise başlıkları gösterme  */}
              {order.orderStatus !== "Sipariş İptal Edildi" ? (
                <div className="admin-order-state-change">
                  <div className="state-type">
                    {order.orderStatus === "Ödeme Bekleniyor" ? (
                      <p
                        className={
                          orderStateChange[0] ? "state-type-selected" : ""
                        }
                        onClick={() =>
                          setOrderStateChange([true, false, false])
                        }
                      >
                        Sipariş Hazırlanıyor
                      </p>
                    ) : null}

                    {order.orderStatus === "Sipariş Hazırlanıyor" ? (
                      <p
                        className={
                          orderStateChange[1] ? "state-type-selected" : ""
                        }
                        onClick={() =>
                          setOrderStateChange([false, true, false])
                        }
                      >
                        Kargoya Verildi
                      </p>
                    ) : null}

                    <p
                      className={
                        orderStateChange[2] ? "state-type-selected" : ""
                      }
                      onClick={() => setOrderStateChange([false, false, true])}
                    >
                      İptal Et
                    </p>
                  </div>
                  {orderStateChange[1] ? (
                    <input
                      type="text"
                      placeholder="Takip Numarası Giriniz"
                      onChange={(e) => setOrderStateInput(e.target.value)}
                    />
                  ) : null}
                  {orderStateChange[2] ? (
                    <input
                      type="text"
                      placeholder="İptal Sebebi Giriniz"
                      onChange={(e) => setOrderStateInput(e.target.value)}
                    />
                  ) : null}
                  <button onClick={updateOrderStatusFunc}>Güncelle</button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminOrderDetail;
