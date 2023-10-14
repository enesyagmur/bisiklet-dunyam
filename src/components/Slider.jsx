import React, { useEffect, useState } from "react";
import "../styles/components-style/slider.css";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { productAddToBasket } from "../redux/basketSlice";

const Slider = () => {
  const [bikes, setBikes] = useState([]);
  const [sliderCount, setSliderCount] = useState(0);
  const products = useSelector((state) => state.products.allProductsList);

  const dispatch = useDispatch();

  //redux tan bisikletleri getirme
  const getBikesFromDb = () => {
    const newArray = products.filter(
      (product) => product.productCategory === "bisiklet"
    );
    setBikes(newArray);
  };

  //slider sayaç arttırma
  const sliderCountIncrease = () => {
    if (sliderCount < 3) {
      setSliderCount(sliderCount + 1);
    } else {
      setSliderCount(0);
    }
  };

  //slider sayaç azaltma
  const sliderCountDecrease = () => {
    if (sliderCount > 0) {
      setSliderCount(sliderCount - 1);
    } else {
      setSliderCount(3);
    }
  };

  //sepete ekle func
  const productAddToBasketFunc = (product) => {
    dispatch(productAddToBasket(product));
  };

  useEffect(() => {
    getBikesFromDb();
  }, [products]);

  return (
    <div className="slider">
      <div className="slider-left-btn">
        <BsChevronLeft onClick={sliderCountDecrease} />
      </div>
      <div className="slider-right-btn">
        <BsChevronRight onClick={sliderCountIncrease} />
      </div>
      {bikes[sliderCount] ? (
        <div className="slider-main">
          <p className="slider-name">{bikes[sliderCount].productName}</p>
          <p className="slider-detail">{bikes[sliderCount].productDetail}</p>
          <p className="slider-price">{bikes[sliderCount].productPrice} TL</p>
          <img src={bikes[sliderCount].productImage} alt="" />
          <button
            className="slider-btn"
            onClick={() => productAddToBasketFunc(bikes[sliderCount])}
          >
            Sepete Ekle
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Slider;
