import React from "react";
import "../orderStyles/payment.css";
import { BsCash } from "react-icons/bs";
import { RiPhoneLockLine } from "react-icons/ri";

const Payment = ({ deliveryType }) => {
  return (
    <div className="pay-methods">
      <p className="pay-methods-title">Ödeme Tipi</p>
      <div className="methods">
        <div className="valid-method">
          <p className="method-title">EFT / Havale</p>
          <RiPhoneLockLine className="pay-methods-icon" />
        </div>
        <div className={deliveryType === 1 ? "valid-method" : "invalid-method"}>
          <p>Nakit</p>
          <BsCash className="pay-methods-icon" />
        </div>
      </div>
      <p>
        Siparişinizi oluşturduktan sonra açık olan ödeme yöntemlerini
        kullanabilirsiniz.
      </p>
    </div>
  );
};

export default Payment;
