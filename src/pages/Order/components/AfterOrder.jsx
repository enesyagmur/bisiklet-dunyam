import React from "react";
import "../orderStyles/afterOrder.css";
import ibanImage from "../../../images/benim-iban.jpg";

const AfterOrder = ({ orderInfo }) => {
  return (
    <div className="after-order">
      {orderInfo ? (
        <>
          <div className="after-order-detail">
            <div className="after-order-title">
              <div className="order-number">
                <p>Sipariş Numarası</p> :
                <p className="order-title-info">{orderInfo.orderNumber}</p>
              </div>
              <div className="order-total">
                <p>Sipariş Toplamı</p> :
                <p className="order-title-info">{orderInfo.orderTotal} TL</p>
              </div>
            </div>
            <div className="after-order-products">
              {orderInfo.orderProducts.map((product) => (
                <div className="after-single-order">
                  <img src={product.productImage} alt="" />
                  <p className="after-product-detail">
                    {product.productDetail}
                  </p>
                </div>
              ))}
            </div>
            <div className="after-order-pay">
              {orderInfo.deliveryType === 0 ? (
                <div className="order-send-adress">
                  <div className="order-send-adress-explain">
                    <p className="order-send-adress-title">
                      Adrese Teslim Edilecek
                    </p>
                    <p>İban ile yapacağınız ödemelerde:</p>
                    <p>Alıcı ismine Yakup Durur</p>
                    <p>
                      Açıklamaya {orderInfo.orderNumber} sipariş numarası
                      girmeniz yeterli
                    </p>
                    <p>
                      Siparişinizi oluşturduktan sonra 24 saat içerisinde ödeme
                      yapmanız gerekiyor. 24 saat içerisinde ödeme yapılmayan
                      siparişler otomatik olarak iptal edilir.
                    </p>
                  </div>
                  <div className="iban">
                    <div className="iban-info">
                      <div className="iban-name">
                        <p>Alıcı İsmi</p> <p>Yakup Durur</p>
                      </div>
                      <div className="iban-number">
                        <p>İban Numarası</p>
                        <p>TR36 0001 0001 7191 2416 7550 01</p>
                      </div>
                      <div className="iban-explain">
                        <p>İban Açıklama</p>
                        <p> {orderInfo.orderNumber}</p>
                      </div>
                      <div className="iban-total">
                        <p>Tutar</p>
                        <p> {orderInfo.orderTotal} TL</p>
                      </div>
                    </div>
                    <div className="iban-qr">
                      <img src={ibanImage} alt="" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="order-take-shop">
                  <p className="order-take-shop-title">
                    Şubeden Teslim Alınacak
                  </p>
                  <p>
                    Şubeye gelmeden önce iletişim kurarak siparişinizin
                    hazırlanması için bilgi vermeyi unutmayınız.
                  </p>
                  <p>
                    Siparişinizin ücretini ürünü şubeden teslim aldıktan sonra
                    iban ya da nakit olarak yapabilirsiniz.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AfterOrder;
