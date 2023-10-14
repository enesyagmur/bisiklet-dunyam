import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/products.css";
import { useDispatch, useSelector } from "react-redux";
import { productAddToBasket } from "../redux/basketSlice";
import ScrollButton from "../components/ScrollButton";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useParams } from "react-router-dom";
import { BsFilterCircleFill } from "react-icons/bs";

const Products = () => {
  const basket = useSelector((state) => state.basket.basketProducts);
  const [products, setProducts] = useState([]);
  const [cloneProducts, setcloneProducts] = useState([]);
  const [categoryCheckboxList, setcategoryCheckboxList] = useState([
    false,
    false,
    false,
    false,
    true,
  ]);
  const [priceCheckboxList, setpriceCheckboxList] = useState([
    false,
    false,
    false,
    false,
    true,
  ]);
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const { categoryName } = useParams();

  const productsCollectionRef = collection(db, "products");

  //ürünleri alma
  const getAllProductsFunc = async (category) => {
    try {
      const productsData = await getDocs(productsCollectionRef);
      const justProducts = productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //kullanıcı belli bir category e tıkladıysa sadece o ürünleri göstermek için koşul
      if (category === "all") {
        setcloneProducts(justProducts);
      } else {
        const newArray = justProducts.filter(
          (product) => product.productCategory === categoryName
        );
        setcloneProducts(newArray);
      }
      setProducts(justProducts);
    } catch (err) {
      alert(err);
    }
  };

  //kategori seçme
  const changeCategory = (select) => {
    const newArray = [...categoryCheckboxList];
    for (let i = 0; i < newArray.length; i++) {
      if (i === select) {
        newArray[i] = true;
      } else {
        newArray[i] = false;
      }
    }
    setcategoryCheckboxList(newArray);
  };

  //fiyat seçme
  const changePrice = (select) => {
    const newArray = [...priceCheckboxList];
    for (let i = 0; i < newArray.length; i++) {
      if (i === select) {
        newArray[i] = true;
      } else {
        newArray[i] = false;
      }
      setpriceCheckboxList(newArray);
    }
  };

  //tıklanan gategoriye gore filitreleme
  const categoryFilterFunc = () => {
    if (categoryCheckboxList[0] === true) {
      const newArray = products.filter(
        (product) => product.productCategory === "bisiklet"
      );
      setcloneProducts(newArray);
    } else if (categoryCheckboxList[1] === true) {
      const newArray = products.filter(
        (product) => product.productCategory === "aksesuar"
      );
      setcloneProducts(newArray);
    } else if (categoryCheckboxList[2] === true) {
      const newArray = products.filter(
        (product) => product.productCategory === "tamir"
      );
      setcloneProducts(newArray);
    } else if (categoryCheckboxList[3] === true) {
      const newArray = products.filter(
        (product) => product.productCategory === "parca"
      );
      setcloneProducts(newArray);
    } else if (
      categoryCheckboxList[0] === false &&
      categoryCheckboxList[1] === false &&
      categoryCheckboxList[2] === false &&
      categoryCheckboxList[3] === false
    ) {
      setcloneProducts(products);
    }
  };

  //tıklanan fiyata göre filitreleem
  const priceFilterFunc = () => {
    products.map(
      (product) => (product.productPrice = Number(product.productPrice))
    );
    let newArray = [...products];
    if (priceCheckboxList[0] === true) {
      newArray = newArray.filter((product) => product.productPrice <= 200);
      setcloneProducts(newArray);
    } else if (priceCheckboxList[1] === true) {
      newArray = newArray.filter(
        (product) => product.productPrice > 200 && product.productPrice <= 400
      );
      setcloneProducts(newArray);
    } else if (priceCheckboxList[2] === true) {
      newArray = newArray.filter(
        (product) => product.productPrice > 400 && product.productPrice <= 600
      );
      setcloneProducts(newArray);
    } else if (priceCheckboxList[3] === true) {
      newArray = newArray.filter((product) => product.productPrice >= 600);
      setcloneProducts(newArray);
    } else if (priceCheckboxList[4] === true) {
      newArray = [...products];
      setcloneProducts(newArray);
    }
  };

  //sepete eklenince butonun style ını değiştiren func
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

  //sayfa açıldığında getAllProductsFunc nu çalıştırıyor
  useEffect(() => {
    getAllProductsFunc(categoryName);
  }, []);

  //fiyat değişikliğini takip ediyor ona göre priceFilterFunc nunu çalıştırıyor
  useEffect(() => {
    priceFilterFunc();
  }, [priceCheckboxList]);

  //kategori değişikliğini takip ediyor ona göre categoryFilterFunc nunu çalıştırıyor
  useEffect(() => {
    categoryFilterFunc();
  }, [categoryCheckboxList]);

  return (
    <div className="products">
      <Header />
      <div className="products-body">
        <p className="products-main-title">ÜRÜNLER</p>

        <div className="products-main">
          <BsFilterCircleFill
            className="filter-icon"
            onClick={() => setOpenFilter(!openFilter)}
          />
          {/* Fİlter------------------------------------------------------------ */}
          <div className={openFilter ? "open-filter" : "products-filter"}>
            {/* ------------------ */}
            <div className="category-filter">
              <p className="category-title">Kategoriler</p>
              <div className="category-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={categoryCheckboxList[0]}
                  onClick={() => changeCategory(0)}
                />
                <p className="category-name">Bisiklet</p>
              </div>
              <div className="category-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={categoryCheckboxList[1]}
                  onClick={() => changeCategory(1)}
                  className="checkbox"
                />
                <p className="category-name">Aksesuar</p>
              </div>
              <div className="category-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={categoryCheckboxList[2]}
                  onClick={() => changeCategory(2)}
                />
                <p className="category-name">Bisiklet Tamir</p>
              </div>
              <div className="category-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={categoryCheckboxList[3]}
                  onClick={() => changeCategory(3)}
                />
                <p className="category-name">Bisiklet Parçası</p>
              </div>
              <div className="category-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={categoryCheckboxList[4]}
                  onClick={() => changeCategory(4)}
                />
                <p className="category-name">Tüm Ürünler</p>
              </div>
            </div>
            {/* ------------------ */}
            <div className="price-filter">
              <p className="price-title">Fiyat</p>
              <div className="price-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={priceCheckboxList[0]}
                  onClick={() => changePrice(0)}
                />
                <p className="price-range">0 - 200</p>
              </div>
              <div className="price-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={priceCheckboxList[1]}
                  onClick={() => changePrice(1)}
                />
                <p className="price-range">201 - 400</p>
              </div>
              <div className="price-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={priceCheckboxList[2]}
                  onClick={() => changePrice(2)}
                />
                <p className="price-range">401 - 600</p>
              </div>
              <div className="price-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={priceCheckboxList[3]}
                  onClick={() => changePrice(3)}
                />
                <p className="price-range">600+</p>
              </div>
              <div className="price-single">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={priceCheckboxList[4]}
                  onClick={() => changePrice(4)}
                />
                <p className="price-range">Tüm Fiyatlar</p>
              </div>
            </div>
            {/* ------------------ */}
            {/* <div className="color">
              <p className="color-title">Renkler</p>
              <div className="color-range">
                <div className="single-color" id="red"></div>
                <div className="single-color" id="blue"></div>
                <div className="single-color" id="green"></div>
                <div className="single-color" id="yellow"></div>
                <div className="single-color" id="black"></div>
              </div>
            </div> */}
          </div>
          {/* Product-List------------------------------------------------------------ */}
          <div className="products-list">
            {cloneProducts
              ? cloneProducts.map((product) => (
                  <div className="product">
                    <div className="product-image">
                      <img src={product.productImage} alt="" />
                    </div>

                    <div className="product-info">
                      <p className="product-name">{product.productName}</p>
                      <p className="product-price">{product.productPrice} TL</p>
                      <p className="product-category">
                        {product.productCategory}
                      </p>
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
      </div>
      <ScrollButton />
      <Footer />
    </div>
  );
};

export default Products;
