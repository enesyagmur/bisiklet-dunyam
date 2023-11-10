import React, { useEffect, useState } from "react";
import "./orderStyles/ordercreate.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdressSelect from "./components/AdressSelect";
import Payment from "./components/Payment";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket } from "../../redux/basketSlice";
import AfterOrder from "./components/AfterOrder";
import toast from "react-hot-toast";

const OrderCreate = () => {
  const { total } = useParams();
  const [adress, setAdress] = useState();
  const [deliveryType, setDeliveryType] = useState(0);
  const [contract, setContract] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});

  const [randomNumber, setRandomNumber] = useState(0);
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basketProducts);
  const userInfo = useSelector((state) => state.user.userInfoList);
  const createRandomNumberFunc = () => {
    setRandomNumber(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
  };

  useEffect(() => {
    createRandomNumberFunc();
  }, []);

  //sipariş oluşturma
  const createOrderFunc = async () => {
    var now = new Date().toLocaleString(`tr-TR`);
    if (randomNumber !== 0) {
      if (contract === true) {
        try {
          await addDoc(collection(db, "orders"), {
            orderNumber: randomNumber,
            orderAdress: adress,
            orderTotal: total,
            orderProducts: basket,
            orderCreaterId: auth.currentUser.uid,
            orderUserInfo: userInfo,
            orderCreateTime: now,
            orderStatus: "Ödeme Bekleniyor",
            orderStatusDetail: "Ödeme Bekleniyor",
          });
          toast.success(`Siparişiniz oluşturuldu.`, {
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

          basket.map((product) => {
            const productRef = doc(db, "products", product.id);
            const productCount = product.productBasketCount;
            //sipariş oluşturulduktan sonra stok azaltan func
            const stockUpdateFunc = async () => {
              await updateDoc(productRef, {
                productStock:
                  Number(product.productStock) - Number(productCount),
              });
            };

            stockUpdateFunc();
          });

          setOrderInfo({
            orderNumber: randomNumber,
            orderAdress: adress,
            orderTotal: total,
            orderProducts: basket,
            deliveryType: deliveryType,
          });

          setOrderCreated(true);
          dispatch(clearBasket());
          setRandomNumber(0);
        } catch (err) {
          alert(err);
        }
      } else {
        toast.error(
          `Sipariş oluşturmadan önce mesafeli satış sözleşmesini onaylamanız gerekiyor.`,
          {
            style: {
              border: "1px solid #b12718",
              padding: "16px",
              color: "#b12718",
            },
            iconTheme: {
              primary: "#b12718",
              secondary: "#e6e6e5",
            },
          }
        );
      }
    }
  };

  return (
    <div className="order-create">
      <Header />

      {orderCreated ? (
        <AfterOrder orderInfo={orderInfo} />
      ) : (
        <div className="order-main">
          <div className="order-components">
            <AdressSelect
              setAdress={setAdress}
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
            />

            <Payment deliveryType={deliveryType} />
          </div>
          <div className="order-result">
            <div className="order-contract">
              <input
                type="checkbox"
                name=""
                id=""
                checked={contract}
                onClick={() => setContract(!contract)}
              />
              <p className="order-contract-info">
                Ön Bilgilendirme Koşulları'nı ve Mesafeli Satış Sözleşmesi'ni
                okudum, onaylıyorum.
              </p>
            </div>
            <div className="order-total">
              <div className="order-delivery-fee">
                <p>Kargo Ücreti</p> <p>29.99 TL</p>
              </div>
              <div className="order-total-amount">
                <p>Toplam Tutar</p> <p>{total} TL</p>
              </div>
            </div>
            <button onClick={createOrderFunc} className="order-create-btn">
              Siparişi oluştur
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderCreate;
