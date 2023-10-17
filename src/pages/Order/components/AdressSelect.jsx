import React, { useEffect, useState } from "react";
import "../orderStyles/adressSelect.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { BsPencil } from "react-icons/bs";
import { BsTruckFront } from "react-icons/bs";
import { BsShop } from "react-icons/bs";

const AdressSelect = ({ setAdress, deliveryType, setDeliveryType }) => {
  const navigate = useNavigate();
  const [userAdress, setUserAdress] = useState(["boş"]);

  const getAdressFunc = async () => {
    const userAdress = await getDocs(collection(db, "usersAdress"));
    const adressData = userAdress.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const searchAdress = adressData.filter(
      (adress) => adress.userId === auth.currentUser.uid
    );

    if (searchAdress.length > 0) {
      setUserAdress(searchAdress);
      setAdress(searchAdress);
    } else {
      alert("adres ve kişisel bilgileri kayıt etmeniz gerekiyor");
      navigate("/account");
    }
  };

  useEffect(() => {
    getAdressFunc();
  }, []);
  return (
    <div className="adress-select">
      <div className="user-adress">
        <p className="user-adress-title">
          Kayıtlı Adres <BsPencil className="adres-change-btn" />
        </p>
        {userAdress[0] ? (
          <div className="user-adress-info">
            <div className="">
              <p>Adres Başlığı </p> <p> {userAdress[0].adressTitle}</p>
            </div>
            <div className="">
              <p>Sokak</p> <p> {userAdress[0].adressStreet}</p>
            </div>
            <div className="">
              <p>Bina Bilgisi</p> <p>{userAdress[0].adressBuild}</p>
            </div>
            <div className="">
              <p>Daire Numarası</p> <p>{userAdress[0].adressHouse}</p>
            </div>
            <div className="">
              <p>Mahalle</p> <p>{userAdress[0].adressNeighborhood}</p>
            </div>

            <div className="">
              <p>İlçe</p> <p>{userAdress[0].adressCountry}</p>
            </div>

            <div className="">
              <p>Şehir</p> <p>{userAdress[0].adressCity}</p>
            </div>

            <div className="">
              <p>Adres Açıklama</p> <p> {userAdress[0].adressDescription}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="delivery-type">
        <p className="delivery-type-title">Teslimat Tipi</p>
        <div className="types">
          <div
            className={deliveryType === 0 ? "valid-method" : "invalid-method"}
            onClick={() => setDeliveryType(0)}
          >
            <p className="type-title">Adrese Teslimat</p>
            <BsTruckFront className="delivery-type-icon" />
          </div>
          <div
            className={deliveryType === 1 ? "valid-method" : "invalid-method"}
            onClick={() => setDeliveryType(1)}
          >
            <p className="type-title">Mağazadan Teslim Al</p>
            <BsShop className="delivery-type-icon" />
          </div>
        </div>
        <p>
          İstediğiniz teslimat tipiniz seçmek için üzerine tıklamanız yeterli.
        </p>
      </div>
    </div>
  );
};

export default AdressSelect;
