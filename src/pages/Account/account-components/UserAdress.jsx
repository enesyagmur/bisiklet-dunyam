import React, { useEffect, useState } from "react";
import "../account-styles/useradress.css";
import { BiArrowBack } from "react-icons/bi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { HiLocationMarker } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";

const UserAdress = ({ dropdownShow, setDropdownShow }) => {
  const [inputAdressTitle, setInputAdressTitle] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [inputBuild, setInputBuild] = useState("");
  const [inputHouse, setInputHouse] = useState("");
  const [inputNeighborhood, setInputNeighborhood] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [userAdress, setUserAdress] = useState(["boş"]);

  //adres kayıt fonksiyonu
  const addressAddFunc = async () => {
    if (inputDescription !== "") {
      try {
        await addDoc(collection(db, "usersAdress"), {
          adressTitle: inputAdressTitle,
          adressStreet: inputStreet,
          adressBuild: inputBuild,
          adressHouse: inputHouse,
          adressNeighborhood: inputNeighborhood,
          adressCountry: inputCountry,
          adressCity: inputCity,
          adressDescription: inputDescription,
          userPhone: inputPhone,
          userEmail: auth.currentUser.email,
          userId: auth.currentUser.uid,
        });

        toast.success(`Adres kayıt edildi.`, {
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
        getAdressFunc();
      } catch (err) {
        toast.error(err, {
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
    }
  };

  //db den adres getirme
  const getAdressFunc = async () => {
    const usersAdress = await getDocs(collection(db, "usersAdress"));
    const adressData = usersAdress.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const searchAdress = adressData.filter(
      (adres) => adres.userId === auth.currentUser.uid
    );

    setUserAdress(searchAdress);
  };

  useEffect(() => {
    getAdressFunc();
  }, []);

  //adres silme
  const deleteAdressFunc = async (id) => {
    const adressDoc = doc(db, "usersAdress", id);
    await deleteDoc(adressDoc);
    toast.success(`Adresiniz silindi`, {
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
    inputsClear();
    getAdressFunc();
    setDropdownShow(0);
  };

  const inputsClear = () => {
    setInputAdressTitle("");
    setInputStreet("");
    setInputBuild("");
    setInputHouse("");
    setInputNeighborhood("");
    setInputCountry("");
    setInputCity("");
    setInputPhone("");
    setInputDescription("");
    setUserAdress(["boş"]);
  };

  return (
    <div
      className={
        dropdownShow === 2 ? "useradress active" : "useradress inactive"
      }
    >
      <div className="user-adress-title">
        <p className="back-button">
          <BiArrowBack onClick={() => setDropdownShow(0)} />
        </p>
        <HiLocationMarker />
        <p className="title">Adres Bilgilerim</p>
      </div>
      <div className={userAdress[0] ? "inactive" : "save-adress"}>
        <input
          type="text"
          placeholder="Adres Başlığı"
          onChange={(e) => setInputAdressTitle(e.target.value)}
          value={inputAdressTitle}
        />
        <input
          type="text"
          placeholder="Sokak"
          onChange={(e) => setInputStreet(e.target.value)}
          value={inputStreet}
        />
        <input
          type="text"
          placeholder="Bina No"
          onChange={(e) => setInputBuild(e.target.value)}
          value={inputBuild}
        />
        <input
          type="text"
          placeholder="Daire"
          onChange={(e) => setInputHouse(e.target.value)}
          value={inputHouse}
        />
        <input
          type="text"
          placeholder="Mahalle"
          onChange={(e) => setInputNeighborhood(e.target.value)}
          value={inputNeighborhood}
        />
        <input
          type="text"
          placeholder="İlçe"
          onChange={(e) => setInputCountry(e.target.value)}
          value={inputCountry}
        />
        <input
          type="text"
          placeholder="Şehir"
          onChange={(e) => setInputCity(e.target.value)}
          value={inputCity}
        />
        <input
          type="text"
          placeholder="Telefon"
          onChange={(e) => setInputPhone(e.target.value)}
          value={inputPhone}
        />

        <input
          type="text"
          placeholder="Adres Tarifi"
          className="adress-detail-input"
          value={inputDescription}
          onChange={(e) => {
            setInputDescription(e.target.value);
          }}
        />

        <button onClick={addressAddFunc}>Adres Kayıt</button>
      </div>

      <div className={userAdress[0] ? "adress-list" : "inactive"}>
        {userAdress[0] ? (
          <div className="adress">
            <p>{userAdress[0].adressTitle} </p>
            <RxCross1
              className="delete-adress-icon"
              onClick={() => deleteAdressFunc(userAdress[0].id)}
            />
            <p>
              {userAdress[0].adressStreet} /{userAdress[0].adressBuild} /{" "}
              {userAdress[0].adressHouse} /{userAdress[0].adressNeighborhood} /{" "}
              {userAdress[0].adressCountry} /{userAdress[0].adressCity} /{" "}
              {userAdress[0].adressDescription}
            </p>
            <p>{userAdress[0].userPhone}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserAdress;
