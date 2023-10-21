import React, { useEffect, useState } from "react";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminproducts.css";
import AdminPanel from "./AdminPanel";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { db } from "../../Firebase";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [productSettings, setProductSettings] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

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

  const showProductSettingsFunc = (product) => {
    setSelectedProduct(product);
    setProductSettings(true);
  };

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        <div className={productSettings ? "inactive" : "panel-products"}>
          <p className="panel-products-title">Ürünler</p>
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
                      <p className="product-category">
                        {product.productCategory}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={productSettings ? "product-settings" : "inactive"}>
          {selectedProduct ? <p>{selectedProduct.productName}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
