import React, { useEffect, useState } from "react";
import "../account-styles/userpersonel.css";
import { BiArrowBack } from "react-icons/bi";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { useDispatch } from "react-redux";
import { changeCurrentUserFromRedux } from "../../../redux/userSlice";
import { BsPencil } from "react-icons/bs";
import { updateEmail } from "firebase/auth";
import { RiProfileFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";

const UserPersonel = ({ dropdownShow, setDropdownShow }) => {
  const [inputName, setInputName] = useState("");
  const [inputSurname, setInputSurname] = useState("");
  const [findUser, setFindUser] = useState(false);
  const [openEmailReset, setOpenEmailReset] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [userId, setUserId] = useState("");
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
      setInputName(user[0].userName);
      setInputSurname(user[0].userSurname);
      setUserId(user[0].id);
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
    if (inputName !== "" && inputSurname !== "") {
      try {
        await addDoc(usersInfoCollectionRef, {
          userName: inputName,
          userSurname: inputSurname,
          userEmail: auth.currentUser.email,
          userId: auth.currentUser.uid,
        });

        toast.success(`Bilgileriniz kayıt edildi.`, {
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
        searchUsersFunc();
        setDropdownShow(0);
      } catch (err) {
        alert(err);
      }
    } else {
      toast.error(`Kayıt için bilgi girilmelidir.`, {
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

  useEffect(() => {
    searchUsersFunc();
  }, []);

  //isim soyisim silme
  const deleteNameFunc = async (id) => {
    const usersInfoDoc = doc(db, "usersInfo", id);
    await deleteDoc(usersInfoDoc);
    searchUsersFunc();
    toast.success(
      `Kişisel bilgileriniz silindi, verilerin güncellenmesi için çıkış-giriş işlemi yapmanızı rica ediyoruz.`,
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
    setDropdownShow(0);
  };

  //mail güncelleme
  const updateEmailFunc = (newEmail) => {
    if (newEmail) {
      updateEmail(auth.currentUser, newEmail)
        .then(() => {
          setOpenEmailReset(false);
          toast.success(`Mail adresiniz güncellendi.`, {
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
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      toast.error(`Güncelleme için email giriniz.`, {
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
    <div
      className={
        dropdownShow === 1 ? "userpersonel active" : "userpersonel inactive"
      }
    >
      <div className="user-personel-title">
        <p className="back-button">
          <BiArrowBack onClick={() => setDropdownShow(0)} />
        </p>
        <RiProfileFill />
        <p className="title"> Bilgilerim</p>
      </div>
      {findUser ? (
        <div className="user-personel-info-show">
          <p className="user-personel-name">
            {inputName ? inputName : null} {inputSurname ? inputSurname : null}
            <RxCross1
              className="delete-name-icon"
              onClick={() => deleteNameFunc(userId)}
            />
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
