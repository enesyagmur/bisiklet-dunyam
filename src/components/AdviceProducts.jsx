import React, { useEffect, useState } from "react";
import "../styles/components-style/adviceproducts.css";
import { useDispatch, useSelector } from "react-redux";
import { productAddToBasket } from "../redux/basketSlice";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdviceProducts = () => {
  const basket = useSelector((state) => state.basket.basketProducts);
  const products = useSelector((state) => state.products.allProductsList);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const filterProductsFunc = () => {
    const filterProducts = products.filter(
      (product) => product.productRecommended === true
    );

    setRecommendedProducts(filterProducts);
  };

  useEffect(() => {
    filterProductsFunc();
  }, [products]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productAddFavoritesFunc = async (name) => {
    if (auth.currentUser) {
      await addDoc(collection(db, "favorites"), {
        productName: name,
        userEmail: auth.currentUser.email,
        userId: auth.currentUser.uid,
      });
    } else {
      navigate("/login");
    }
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
                  onClick={() => productAddFavoritesFunc(product.productName)}
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
                      onClick={() => dispatch(productAddToBasket(product))}
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
