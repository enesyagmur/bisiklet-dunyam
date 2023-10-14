import React, { useEffect, useState } from "react";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminproducts.css";
import AdminPanel from "./AdminPanel";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  const [productName, setproductName] = useState("");
  const [productDetail, setproductDetail] = useState("");
  const [productCategory, setproductCategory] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productStock, setproductStock] = useState("");
  const [productImage, setproductImage] = useState("");

  //tüm ürünleri getirme
  const getAllProductsFunc = async () => {
    try {
      const productsData = await getDocs(productsCollectionRef);
      const justProducts = productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(justProducts);
    } catch (err) {}
  };

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
      await addDoc(productsCollectionRef, {
        productName: productName,
        productDetail: productDetail,
        productCategory: productCategory,
        productPrice: productPrice,
        productStock: productStock,
        productImage: productImage,
        productRecommended: false,
        productId: Math.random(),
      });
      getAllProductsFunc();
      setproductName("");
      setproductDetail("");
      setproductPrice("");
      setproductStock("");
      alert("ürün eklendi");
    } catch (err) {
      alert(err);
    }
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

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        <div className="panel-create-new-product">
          <p className="new-product-title">Yeni Ürün Oluştur</p>
          <div className="create-new-product">
            <input
              type="text"
              placeholder="Ürün İsmi"
              onChange={(e) => setproductName(e.target.value)}
              value={productName}
            />
            <input
              type="text"
              placeholder="Ürün Detay"
              onChange={(e) => setproductDetail(e.target.value)}
              value={productDetail}
            />
            <input
              type="text"
              placeholder="Ürün Kategori"
              onChange={(e) => setproductCategory(e.target.value)}
              value={productCategory}
            />
            <input
              type="text"
              placeholder="Ürün Fiyat"
              onChange={(e) => setproductPrice(e.target.value)}
              value={productPrice}
            />
            <input
              type="text"
              placeholder="Ürün Stok"
              onChange={(e) => setproductStock(e.target.value)}
              value={productStock}
            />
            <input
              type="file"
              placeholder="Ürün Resmi"
              onChange={(e) => {
                addImageToDb(e.target.files[0]);
              }}
            />
            <button onClick={addProductToDbFunc}>Ürün Oluştur</button>
          </div>
        </div>
        <div className="panel-products">
          <p className="panel-products-title">Ürünler</p>
          <div className="panel-product-list">
            {products
              ? products.map((product) => (
                  <div className="panel-single-product">
                    <img src={product.productImage} alt="" />

                    <p className="product-name">{product.productName}</p>
                    <p className="product-category">
                      {product.productCategory}
                    </p>
                    <p className="product-stock">{product.productStock}</p>
                    <p className="product-price">{product.productPrice} TL</p>
                    <p className="product-change-btn">
                      <GoPencil />
                    </p>
                    <p
                      className="product-delete-btn"
                      onClick={() => deleteProductFromDb(product.id)}
                    >
                      <MdDeleteOutline />
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
