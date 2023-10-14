import React, { useEffect, useState } from "react";
import "../account-styles/useradress.css";
import { BiArrowBack } from "react-icons/bi";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../Firebase";

const UserAdress = ({ dropdownShow, setDropdownShow }) => {
  const [inputAdressTitle, setInputAdressTitle] = useState("");
  const [inputStreet, setInputStreet] = useState("");
  const [inputBuild, setInputBuild] = useState("");
  const [inputHouse, setInputHouse] = useState("");
  const [inputNeighborhood, setInputNeighborhood] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [inputCity, setInputCity] = useState("");
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
          userEmail: auth.currentUser.email,
          userId: auth.currentUser.uid,
        });
        alert("adres kayıt edildi");
      } catch (err) {
        alert(err);
      }
    }
  };

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
            <p> {userAdress[0].adressTitle} </p>
            <p>
              {userAdress[0].adressStreet} /{userAdress[0].adressBuild} /{" "}
              {userAdress[0].adressHouse} /{userAdress[0].adressNeighborhood} /{" "}
              {userAdress[0].adressCountry} /{userAdress[0].adressCity} /{" "}
              {userAdress[0].adressDescription}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserAdress;
