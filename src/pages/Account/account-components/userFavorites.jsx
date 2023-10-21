import React, { useEffect, useState } from "react";
import "../account-styles/userfavorites.css";
import { BiArrowBack } from "react-icons/bi";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../../Firebase";
import { MdFavorite } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const UserFavorites = ({ dropdownShow, setDropdownShow }) => {
  const [currentUserFavorites, setcurrentUserFavorites] = useState();

  //favorileri db den getirip Favorites statine yollama
  const getFavoritesFunc = async () => {
    const favoritesData = await getDocs(collection(db, "favorites"));
    const favoritesProducts = favoritesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const newArray = favoritesProducts.filter(
      (favori) => favori.userId === auth.currentUser.uid
    );

    setcurrentUserFavorites(newArray);
  };

  useEffect(() => {
    getFavoritesFunc();
  }, []);

  const deleteFavoriFunc = async (id) => {
    const favoritesDoc = doc(db, "favorites", id);
    await deleteDoc(favoritesDoc);
    getFavoritesFunc();
  };

  return (
    <div
      className={
        dropdownShow === 4 ? "userfavorites active" : "userpersonel inactive"
      }
    >
      <div className="user-favorites-title">
        <p className="back-button">
          <BiArrowBack onClick={() => setDropdownShow(0)} />
        </p>
        <MdFavorite />
        <p className="title">Favorilerim</p>
      </div>

      <div className="favorites">
        {currentUserFavorites
          ? currentUserFavorites.map((favori) => (
              <div className="favori">
                <img src={favori.product.productImage} alt="" />
                <p className="favori-product-name">
                  {favori.product.productName}
                </p>
                <p>{favori.product.productPrice} TL</p>

                <RxCross1
                  className="delete-favori-icon"
                  onClick={() => deleteFavoriFunc(favori.id)}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserFavorites;
