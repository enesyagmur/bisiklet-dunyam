import "../styles/basket.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseProductFromBasket,
  productAddToBasket,
  productDeleteFromBasket,
} from "../redux/basketSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import toast from "react-hot-toast";

const Basket = () => {
  const [total, setTotal] = useState(0);
  const basket = useSelector((state) => state.basket.basketProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let toplam = 0;
    basket.forEach((element) => {
      toplam += Number(element.productPrice);
    });
    setTotal(toplam);
  }, [basket]);

  const deleteProductFunc = (id) => {
    dispatch(productDeleteFromBasket(id));
  };

  //ürün arttırma
  const increaseProductCountFunc = (product) => {
    dispatch(productAddToBasket(product));
  };

  //ürün azaltma
  const decreaseProductCountFunc = (product) => {
    dispatch(decreaseProductFromBasket(product));
  };

  useEffect(() => {
    if (basket.length === 0) {
      toast.success(`Sepetinizde bulunan ürünler silindi.`, {
        style: {
          border: "1px solid #b12718",
          padding: "16px",
          color: "#121212",
        },
        iconTheme: {
          primary: "#e6e6e5",
          secondary: "#b12718",
        },
      });
    }
    setTimeout(() => {
      if (basket.length === 0) {
        navigate("/");
      }
    }, 1000);
  }, [basket]);

  const goOrderCreate = () => {
    if (auth.currentUser) {
      navigate(`/ordercreate/${total}`);
    } else {
      navigate("/login");
    }
  };

  const goProducts = () => {
    const categoryName = "all";
    navigate(`/products/${categoryName}`);
  };

  return (
    <div className="basket">
      <Header />
      <div className="basket-main">
        <div className="basket-product-list">
          {basket
            ? basket.map((product) => (
                <div className="basket-product">
                  <div className="basket-product-img">
                    <img src={product.productImage} alt="" />
                  </div>
                  <p className="basket-product-name">{product.productName}</p>
                  <div className="basket-count-change">
                    <BiMinus
                      className="count-change-icon"
                      onClick={() => decreaseProductCountFunc(product)}
                    />
                    {product.productBasketCount ? (
                      <p>{product.productBasketCount}</p>
                    ) : (
                      1
                    )}
                    <BsPlusLg
                      className="count-change-icon"
                      onClick={() => increaseProductCountFunc(product)}
                    />
                  </div>
                  <p className="basket-product-price">
                    {product.productPrice}TL
                  </p>
                  <button
                    className="basket-product-delete-btn"
                    onClick={() => deleteProductFunc(product.productId)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ))
            : null}
        </div>
        <div className="basket-result">
          <div className="basket-result-count">
            <p>Ürün Sayısı</p>
            <p className="sum-count-p">{basket.length}</p>
          </div>

          <div className="basket-result-price">
            <p>Toplam Tutar</p> <p className="sum-price-p"> {total} TL</p>
          </div>

          <button onClick={goOrderCreate} className="basket-create-order-btn">
            Siparişi Onayla
          </button>
          <p className="basket-continue-shop-btn" onClick={goProducts}>
            Alışverişe Devam Et
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Basket;
