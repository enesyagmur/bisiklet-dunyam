import React, { useEffect, useState } from "react";
import "../account-styles/userpersonel.css";
import { BiArrowBack } from "react-icons/bi";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { useDispatch } from "react-redux";
import { changeCurrentUserFromRedux } from "../../../redux/userSlice";
import { BsPencil } from "react-icons/bs";
import { updateEmail, updatePassword } from "firebase/auth";

const UserPersonel = ({ dropdownShow, setDropdownShow }) => {
  const [inputName, setInputName] = useState("");
  const [inputSurname, setInputSurname] = useState("");
  const [findUser, setFindUser] = useState(false);
  const [openEmailReset, setOpenEmailReset] = useState(false);
  const [inputEmail, setInputEmail] = useState("");

  const [cloneUser, setCloneUser] = useState([]);
  const dispatch = useDispatch();

  const usersInfoCollectionRef = collection(db, "usersInfo");

  //mevcut kullanıcıyı db de atama func
  const searchUsersFunc = async () => {
    const usersData = await getDocs(usersInfoCollectionRef);

    const users = usersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const user = users.filter((item) => item.userId === auth.currentUser.uid);
    if (user[0]) {
      setCloneUser(user);
      setInputName(user[0].userName);
      setInputSurname(user[0].userSurname);
      setFindUser(true);
      dispatch(
        changeCurrentUserFromRedux({
          userName: user[0].userName,
          userSurname: user[0].userSurname,
          userEmail: auth.currentUser.email,
        })
      );
    }
  };

  //veri tabanına kullanıcı isim soy isim girme
  const addUsersInfoFunc = async () => {
    if (cloneUser) {
      alert("bilgiler zaten kayıtlı");
    } else {
      if (inputName !== "" && inputSurname !== "") {
        try {
          await addDoc(usersInfoCollectionRef, {
            userName: inputName,
            userSurname: inputSurname,
            userEmail: auth.currentUser.email,
            userId: auth.currentUser.uid,
          });
          alert("bilgiler kayıt edildi");
        } catch (err) {
          alert(err);
        }
      } else {
        alert("bilgiler boş bırakılamaz");
      }
    }
  };

  useEffect(() => {
    searchUsersFunc();
  }, []);

  //mail güncelleme
  const updateEmailFunc = (newEmail) => {
    if (newEmail) {
      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          setOpenEmailReset(false);
          alert("mail güncellendi");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Email Giriniz");
    }
  };

  return (
    <div
      className={
        dropdownShow === 1 ? "userpersonel active" : "userpersonel inactive"
      }
    >
      <div className="user-personel-title">
        <p className="back-button">
          <BiArrowBack onClick={() => setDropdownShow(0)} />
        </p>

        <p className="title">Bilgilerim</p>
      </div>
      {findUser ? (
        <div className="user-personel-info-show">
          <p className="user-personel-name">
            {inputName ? inputName : null} {inputSurname ? inputSurname : null}
          </p>
          <p className="user-personel-email">
            {auth ? auth.currentUser.email : null}
            <BsPencil
              className="change-personel-info-icon"
              onClick={() => setOpenEmailReset(!openEmailReset)}
            />
          </p>
          {openEmailReset ? (
            <div className="reset-info">
              <input
                type="text"
                placeholder="Yeni Email Giriniz"
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <button onClick={() => updateEmailFunc(inputEmail)}>
                Email Güncelleme
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="user-personel-info-input">
          <p className="user-personel-email">
            {auth ? auth.currentUser.email : null}
          </p>
          <input
            type="text"
            placeholder="İsim Giriniz"
            onChange={(e) => setInputName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Soyisim Giriniz"
            onChange={(e) => setInputSurname(e.target.value)}
          />
          <button onClick={addUsersInfoFunc}>Kaydet</button>
        </div>
      )}
    </div>
  );
};

export default UserPersonel;
