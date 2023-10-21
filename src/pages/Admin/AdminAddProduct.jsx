import React, { useState } from "react";
import { db, storage } from "../../Firebase";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminAddProduct.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import AdminPanel from "./AdminPanel";

const AdminAddProduct = () => {
  const [productName, setproductName] = useState("");
  const [productDetail, setproductDetail] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productStock, setproductStock] = useState("");
  const [productImage, setproductImage] = useState("");

  //resim ekleme
  const addImageToDb = (inputImage) => {
    if (!inputImage) {
      return;
    }

    const imageRef = ref(storage, `products-image/${inputImage.name}`);
    uploadBytes(imageRef, inputImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setproductImage(url);
      });
    });
  };

  //ürün ekleme
  const addProductToDbFunc = async () => {
    try {
      await addDoc(collection(db, "products"), {
        productName: productName,
        productDetail: productDetail,
        productCategory: productCategory,
        productPrice: productPrice,
        productStock: productStock,
        productImage: productImage,
        productRecommended: false,
        productId: Math.random(),
      });

      setproductName("");
      setproductDetail("");
      setproductPrice("");
      setproductStock("");
      alert("ürün eklendi");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        <div className="admin-add-product">
          <p className="new-product-title">Yeni Ürün Oluştur</p>
          <div className="create-new-product">
            <input
              className="input-text"
              type="text"
              placeholder="Ürün İsmi"
              onChange={(e) => setproductName(e.target.value)}
              value={productName}
            />
            <input
              className="input-text"
              type="text"
              placeholder="Ürün Detay"
              onChange={(e) => setproductDetail(e.target.value)}
              value={productDetail}
            />
            <input
              className="input-text"
              type="text"
              placeholder="Ürün Kategori"
              onChange={(e) => setproductCategory(e.target.value)}
              value={productCategory}
            />
            <input
              className="input-text"
              type="text"
              placeholder="Ürün Fiyat"
              onChange={(e) => setproductPrice(e.target.value)}
              value={productPrice}
            />
            <input
              className="input-text"
              type="text"
              placeholder="Ürün Stok"
              onChange={(e) => setproductStock(e.target.value)}
              value={productStock}
            />
            <input
              className="input-image"
              type="file"
              placeholder="Ürün Resmi"
              onChange={(e) => {
                addImageToDb(e.target.files[0]);
              }}
            />
            <button onClick={addProductToDbFunc}>Ürün Oluştur</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
