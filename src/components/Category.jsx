import React from "react";
import "../styles/components-style/category.css";
import kask from "../images/kask.png";
import bisiklet from "../images/bike.png";
import alet from "../images/alet.png";
import malzeme from "../images/parca.png";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const goProducts = (which) => {
    navigate(`/products/${which}`);
  };

  return (
    <div className="category">
      <div className="single-category">
        <div className="category-info">
          <p className="category-name">BİSİKLETLER</p>
          <button
            className="category-btn"
            onClick={() => goProducts("bisiklet")}
          >
            ürünler
          </button>
        </div>
        <div className="category-image">
          <img src={bisiklet} alt="" />
        </div>
      </div>
      <div className="single-category">
        <div className="category-info">
          <p className="category-name">AKSESUARLAR</p>
          <button
            className="category-btn"
            onClick={() => goProducts("aksesuar")}
          >
            ürünler
          </button>
        </div>
        <div className="category-image">
          <img src={kask} alt="" />
        </div>
      </div>
      <div className="single-category">
        <div className="category-info">
          <p className="category-name">ALETLER</p>
          <button className="category-btn" onClick={() => goProducts("tamir")}>
            ürünler
          </button>
        </div>
        <div className="category-image">
          <img src={alet} alt="" />
        </div>
      </div>

      <div className="single-category">
        <div className="category-info">
          <p className="category-name">PARÇALAR</p>
          <button className="category-btn" onClick={() => goProducts("parca")}>
            ürünler
          </button>
        </div>
        <div className="category-image">
          <img src={malzeme} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Category;
