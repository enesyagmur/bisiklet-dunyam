import React, { useEffect, useState } from "react";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminproducts.css";
import AdminPanel from "./AdminPanel";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { BiLike } from "react-icons/bi";
import { db } from "../../Firebase";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [productSettings, setProductSettings] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [inputNewProductValue, setInputNewProductValue] = useState();
  const [checkboxControl, setCheckboxControl] = useState([false, false, false]);

  //tüm ürünleri getirme
  const getAllProductsFunc = async () => {
    try {
      const productsData = await getDocs(collection(db, "products"));
      const justProducts = productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(justProducts);
    } catch (err) {}
  };

  //ürün silme
  const deleteProductFromDb = async (id) => {
    const productsDoc = doc(db, "products", id);
    await deleteDoc(productsDoc);
    getAllProductsFunc();
  };

  //sayfa açılınca getAllproductsFunc çalışsın
  useEffect(() => {
    getAllProductsFunc();
  }, []);

  //ürün detay gösterme
  const showProductSettingsFunc = (product) => {
    setSelectedProduct(product);
    setProductSettings(true);
  };

  //ürün bilgi güncelleme
  const updateProductFunc = async () => {
    const productRef = doc(db, "products", selectedProduct.id);

    if (checkboxControl[0] === true) {
      if (inputNewProductValue) {
        await updateDoc(productRef, {
          productPrice: Number(inputNewProductValue),
        });
        alert(
          `Ürün fiyatı : ${inputNewProductValue} TL olarak güncellendi. Değişikliğin gözükmesi için sayfayı yenileyin.`
        );
      }
      alert("Değer Giriniz");
    } else if (checkboxControl[1] === true) {
      if (inputNewProductValue) {
        await updateDoc(productRef, {
          productStock: Number(inputNewProductValue),
        });
        alert(
          `Ürün Stok : ${inputNewProductValue} adet olarak güncellendi. Değişikliğin gözükmesi için sayfayı yenileyin.`
        );
      } else {
        alert("Değer Giriniz");
      }
    } else if (checkboxControl[2] === true) {
      await updateDoc(productRef, {
        productRecommended: !selectedProduct.productRecommended,
      });
      alert(
        `Ürün Önerilen : ${!selectedProduct.productRecommended} olarak güncellendi. Değişikliğin gözükmesi için sayfayı yenileyin.`
      );
    } else {
      alert("Hangi değeri değiştirmek istediğinizi seçin");
    }
  };

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        <div className={productSettings ? "inactive" : "panel-products"}>
          <p className="admin-products-title">Ürünler</p>
          <div className="panel-product-list">
            {products
              ? products.map((product) => (
                  <div
                    className="panel-single-product"
                    onClick={() => showProductSettingsFunc(product)}
                  >
                    <div className="product-image">
                      <img src={product.productImage} alt="" />
                    </div>

                    <div className="product-info">
                      <p className="product-name">{product.productName}</p>
                      <p className="product-price">{product.productPrice} TL</p>
                      <p className="product-stock">
                        {product.productStock} Adet
                      </p>
                      {product.productRecommended ? (
                        <BiLike className="admin-product-recomended-icon" />
                      ) : null}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={productSettings ? "product-settings-main" : "inactive"}>
          {selectedProduct ? (
            <>
              <p className="admin-products-title">Ürün Düzenleme</p>
              <div className="product-settings-product-info">
                <div className="panel-single-product">
                  <div className="product-image">
                    <img src={selectedProduct.productImage} alt="" />
                  </div>

                  <div className="product-info">
                    <p className="product-name">
                      {selectedProduct.productName}
                    </p>
                    <p className="product-price">
                      {selectedProduct.productPrice} TL
                    </p>
                    <p className="product-stock">
                      {selectedProduct.productStock} Adet
                    </p>
                    {selectedProduct.productRecommended ? (
                      <BiLike className="admin-product-recomended-icon" />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="product-settings">
                <div className="product-settings-checkboxs">
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={checkboxControl[0]}
                      onClick={() => setCheckboxControl([true, false, false])}
                    />
                    <p>Fiyat</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={checkboxControl[1]}
                      onClick={() => setCheckboxControl([false, true, false])}
                    />
                    <p>Stok</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={checkboxControl[2]}
                      onClick={() => setCheckboxControl([false, false, true])}
                    />
                    {selectedProduct.productRecommended ? (
                      <p>Önerilmeyen</p>
                    ) : (
                      <p>Önerilen</p>
                    )}
                  </div>
                </div>

                {checkboxControl[2] === true ? null : (
                  <input
                    className="input-settings-new-value"
                    type="text"
                    placeholder="Yeni Değer Giriniz"
                    onChange={(e) =>
                      setInputNewProductValue(e.currentTarget.value)
                    }
                  />
                )}

                <button
                  className="settings-update-button"
                  onClick={updateProductFunc}
                >
                  Güncelle
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
