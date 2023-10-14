import React, { useState } from "react";
import "../styles/components-style/wishlist.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const navigate = useNavigate();
  const [inputWish, setInputWish] = useState("");
  const wishlistCollectionRef = collection(db, "wishlist");

  const addWishlist = async () => {
    if (inputWish !== "") {
      if (auth.currentUser) {
        try {
          await addDoc(wishlistCollectionRef, {
            wishInfo: inputWish,
            userid: auth.currentUser.uid,
          });
          setInputWish("");
          alert("İstek Kayıt Alındı");
        } catch (err) {
          alert(err);
        }
      } else {
        navigate("/login");
      }
    } else {
      alert("istek Kutusu Boş Bırakılamaz");
    }
  };
  return (
    <div className="wishlist">
      <div className="wishlist-main">
        <p className="wishlist-title">İSTEK LİSTESİ</p>
        <input
          type="text"
          placeholder=""
          value={inputWish}
          onChange={(e) => setInputWish(e.target.value)}
        />
        <p className="wishlist-info">
          Siteye ya da mağazaya gelmesini istediğiniz ürünün adını ya da linkini
          ekleyebilirsiniz. Talep ve uygunluk doğrultusunda istek listesine
          eklediğiniz ürünleri sizin için temin edebiliriz.
        </p>
        <button className="wishlist-btn" onClick={addWishlist}>
          Talep
        </button>
      </div>
    </div>
  );
};

export default WishList;
