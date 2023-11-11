import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/products.css";
import { useDispatch, useSelector } from "react-redux";
import { productAddToBasket } from "../redux/basketSlice";
import ScrollButton from "../components/ScrollButton";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { BsFilterCircleFill } from "react-icons/bs";
import BasketIcon from "../components/BasketIcon";
import toast from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";

const Products = () => {
  const basket = useSelector((state) => state.basket.basketProducts);
  const [products, setProducts] = useState([]);
  const [cloneProducts, setcloneProducts] = useState([]);
  const [afterPriceFilterProducts, setAfterPriceFilterProducts] = useState([]);
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
  const [productCheckInFavorites, setproductCheckInFavorites] = useState(false);
  const dispatch = useDispatch();
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [userFavorites, setUserFavorites] = useState();
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
        setAfterPriceFilterProducts(justProducts);
      } else {
        const newArray = justProducts.filter(
          (product) => product.productCategory === categoryName
        );
        setcloneProducts(newArray);
        setAfterPriceFilterProducts(newArray);
      }
      setProducts(justProducts);
    } catch (err) {
      alert(err);
    }
  };

  //arama func
  const searchFunc = (inputProduct) => {
    const newArray = products.filter((product) =>
      product.productName.toLowerCase().includes(inputProduct.toLowerCase())
    );

    if (newArray) {
      setAfterPriceFilterProducts(newArray);
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

  //tıklanan kategoriye gore filitreleme
  const categoryFilterFunc = () => {
    let arrayForCatogeryFilter = [...products];

    if (categoryCheckboxList[0] === true) {
      const newArray = arrayForCatogeryFilter.filter(
        (product) => product.productCategory === "bisiklet"
      );
      setcloneProducts(newArray);
      setAfterPriceFilterProducts(newArray);
    } else if (categoryCheckboxList[1] === true) {
      const newArray = arrayForCatogeryFilter.filter(
        (product) => product.productCategory === "aksesuar"
      );
      setcloneProducts(newArray);
      setAfterPriceFilterProducts(newArray);
    } else if (categoryCheckboxList[2] === true) {
      const newArray = arrayForCatogeryFilter.filter(
        (product) => product.productCategory === "tamir"
      );
      setcloneProducts(newArray);
      setAfterPriceFilterProducts(newArray);
    } else if (categoryCheckboxList[3] === true) {
      const newArray = arrayForCatogeryFilter.filter(
        (product) => product.productCategory === "parca"
      );
      setcloneProducts(newArray);
      setAfterPriceFilterProducts(newArray);
    } else if (
      categoryCheckboxList[0] === false &&
      categoryCheckboxList[1] === false &&
      categoryCheckboxList[2] === false &&
      categoryCheckboxList[3] === false
    ) {
      setcloneProducts(arrayForCatogeryFilter);
      setAfterPriceFilterProducts(arrayForCatogeryFilter);
    }
  };

  //tıklanan fiyata göre filitreleem
  const priceFilterFunc = () => {
    let newArray = [];
    if (priceCheckboxList[0] === true) {
      newArray = cloneProducts.filter(
        (product) => Number(product.productPrice) <= 200
      );
      setAfterPriceFilterProducts(newArray);
    } else if (priceCheckboxList[1] === true) {
      newArray = cloneProducts.filter(
        (product) =>
          Number(product.productPrice) > 200 &&
          Number(product.productPrice) <= 400
      );
      setAfterPriceFilterProducts(newArray);
    } else if (priceCheckboxList[2] === true) {
      newArray = cloneProducts.filter(
        (product) =>
          Number(product.productPrice) > 400 &&
          Number(product.productPrice) <= 600
      );
      setAfterPriceFilterProducts(newArray);
    } else if (priceCheckboxList[3] === true) {
      newArray = cloneProducts.filter(
        (product) => Number(product.productPrice) >= 600
      );
      setAfterPriceFilterProducts(newArray);
    } else if (priceCheckboxList[4] === true) {
      setAfterPriceFilterProducts(cloneProducts);
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

  //bu kullanıcının kaç favorilerini alma ve favori sayısını, aynı ürün kontrolu yapma
  const getUserFavoriFunc = async (productName) => {
    const favoritesData = await getDocs(collection(db, "favorites"));
    const favoritesProducts = favoritesData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    let newArray = [];
    if (auth.currentUser) {
      const newArray = favoritesProducts.filter(
        (favori) => favori.userId === auth.currentUser.uid
      );
      if (newArray) {
        setUserFavorites(newArray);
      }
    }
    const findFavori = newArray.filter(
      (favori) => favori.product.productName === productName
    );
    if (findFavori) {
      setproductCheckInFavorites(true);
    } else {
      setproductCheckInFavorites(false);
    }
  };

  //ürünü favorilere ekleme func
  const productAddFavoritesFunc = async (product) => {
    if (auth.currentUser) {
      const favoritesData = await getDocs(collection(db, "favorites"));
      const favoritesProducts = favoritesData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const newArray = favoritesProducts.filter(
        (favori) => favori.userId === auth.currentUser.uid
      );
      //favorilerinde ürün var ise
      if (newArray) {
        //ürün sayısı 6 dan küçük se
        if (newArray.length < 6) {
          const findFavori = newArray.find(
            (favori) => favori.product.productName === product.productName
          );
          //eklemek istediği ürün favorilerinde zaten var ise
          if (findFavori) {
            toast.error(`Seçtiğiniz ürün favorilerinizde bulunuyor.`, {
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
          //eklemek istediği ürün favorilerinde yok ise
          else {
            await addDoc(collection(db, "favorites"), {
              product: product,
              userEmail: auth.currentUser.email,
              userId: auth.currentUser.uid,
            });
            toast("Favorilere Eklendi.");
          }
        } else {
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
      }
      //favorilerinde hiç ürün yok
      else {
        await addDoc(collection(db, "favorites"), {
          product: product,
          userEmail: auth.currentUser.email,
          userId: auth.currentUser.uid,
        });
        toast("Favorilere Eklendi.");
      }
    } else {
      navigate("/login");
    }
  };

  //sayfa açıldığında getAllProductsFunc nu çalıştırıyor
  useEffect(() => {
    getAllProductsFunc(categoryName);
    getUserFavoriFunc();
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
      <BasketIcon />
      <div className="products-body">
        <p className="products-main-title">ÜRÜNLER</p>
        <input
          type="text"
          placeholder="Ürün Arama"
          className="products-searchbar"
          onChange={(e) => searchFunc(e.target.value)}
        />

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
          </div>
          {/* Product-List------------------------------------------------------------ */}
          {afterPriceFilterProducts ? (
            <div
              className={openFilter ? "hide" : "products-list"}
              onClick={() => setOpenFilter(false)}
            >
              {afterPriceFilterProducts.map((product) => (
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
              ))}
            </div>
          ) : (
            <div className="products-no-product">Ürün Bulunmuyor</div>
          )}
        </div>
      </div>
      <ScrollButton />
      <Footer />
    </div>
  );
};

export default Products;
