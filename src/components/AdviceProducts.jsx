import React, { useEffect, useState } from "react";
import "../styles/components-style/adviceproducts.css";
import { useDispatch, useSelector } from "react-redux";
import { productAddToBasket } from "../redux/basketSlice";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdviceProducts = () => {
  const basket = useSelector((state) => state.basket.basketProducts);
  const products = useSelector((state) => state.products.allProductsList);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [userFavoritesCheck, setUserFavoritesCheck] = useState();

  const filterProductsFunc = () => {
    const filterProducts = products.filter(
      (product) => product.productRecommended === true
    );

    setRecommendedProducts(filterProducts);
  };

  //bu kullanıcının kaç favori ürünü var ona bakıcaz
  const checkUserFavoriCountFunc = async () => {
    const favoritesData = await getDocs(collection(db, "favorites"));
    const favoritesProducts = favoritesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (auth.currentUser) {
      const newArray = favoritesProducts.filter(
        (favori) => favori.userId === auth.currentUser.uid
      );
      if (newArray.length === 6) {
        setUserFavoritesCheck(false);
      } else {
        setUserFavoritesCheck(true);
      }
    }
  };

  useEffect(() => {
    filterProductsFunc();
    checkUserFavoriCountFunc();
  }, [products]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //ürünü favorilere ekleme func
  const productAddFavoritesFunc = async (product) => {
    checkUserFavoriCountFunc();

    if (auth.currentUser) {
      if (userFavoritesCheck) {
        await addDoc(collection(db, "favorites"), {
          product: product,
          userEmail: auth.currentUser.email,
          userId: auth.currentUser.uid,
        });
        toast("Favorilere Eklendi.");
      } else if (userFavoritesCheck !== true) {
        toast.error(`Favorileriniz dolu.`, {
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
    } else {
      navigate("/login");
    }
  };

  const addBasketFunc = (product) => {
    dispatch(productAddToBasket(product));
  };

  const checkBasketFunc = (productname) => {
    const newArray = basket.find(
      (product) => product.productName === productname
    );

    if (newArray) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="adviceproducts">
      <div className="products-title">
        <p className="title">Önerilenler</p>
      </div>
      <div className="products-list">
        {recommendedProducts
          ? recommendedProducts.map((product) => (
              <div className="product">
                <AiOutlineHeart
                  className="product-heart-icon"
                  onClick={() => productAddFavoritesFunc(product)}
                />
                <div className="product-image">
                  <img src={product.productImage} alt="" />
                </div>

                <div className="product-info">
                  <p className="product-name">{product.productName}</p>
                  <p className="product-price">{product.productPrice} TL</p>
                  <p className="product-category">{product.productCategory}</p>
                  {checkBasketFunc(product.productName) ? (
                    <button className="product-already-in-basket-btn">
                      Sepete Eklendi
                    </button>
                  ) : (
                    <button
                      className="product-add-basket-btn"
                      onClick={() => addBasketFunc(product)}
                    >
                      Sepete Ekle
                    </button>
                  )}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdviceProducts;
