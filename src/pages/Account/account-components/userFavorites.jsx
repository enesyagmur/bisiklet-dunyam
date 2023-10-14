import React, { useEffect, useState } from "react";
import "../account-styles/userfavorites.css";
import { BiArrowBack } from "react-icons/bi";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../Firebase";
const UserFavorites = ({ dropdownShow, setDropdownShow }) => {
  const [favorites, setFavorites] = useState();

  const getFavoritesFunc = async () => {
    const favoritesData = await getDocs(collection(db, "favorites"));
    const favoritesProducts = favoritesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const newArray = favoritesProducts.filter(
      (favori) => favori.userId === auth.currentUser.uid
    );

    setFavorites(newArray);
  };

  useEffect(() => {
    getFavoritesFunc();
  }, []);

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

        <p className="title">Siparişlerim</p>
      </div>

      <div className="favorites">
        {favorites
          ? favorites.map((favori) => (
              <div className="favori">
                <p className="favori-product-name">{favori.productName}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default UserFavorites;
