import "../styles/basket.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { productDeleteFromBasket } from "../redux/basketSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { RiDeleteBin6Line } from "react-icons/ri";

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

  useEffect(() => {
    alert("Sepetinizde bulunan ürünler silindi.");
    if (basket.length === 0) {
      navigate("/");
    }
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
