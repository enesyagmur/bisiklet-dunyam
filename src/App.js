import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Basket from "./pages/Basket";
import Account from "./pages/Account/Account";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProducts from "./pages/Admin/AdminProducts";
import OrderCreate from "./pages/Order/OrderCreate";
import AdminOrderDetail from "./pages/Admin/AdminOrderDetail";
import UserOrderDetail from "./pages/Account/UserOrderDetail";
import AdminAddProduct from "./pages/Admin/AdminAddProduct";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { useDispatch } from "react-redux";
import { addProductsToRedux } from "./redux/productsSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const getProductsFunc = async () => {
    const productsData = await getDocs(collection(db, "products"));
    const products = productsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch(addProductsToRedux(products));
  };

  useEffect(() => {
    getProductsFunc();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/account" element={<Account />} />
          <Route path="/products/:categoryName" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminorders" element={<AdminOrders />} />
          <Route path="/adminproducts" element={<AdminProducts />} />
          <Route path="/adminaddproduct" element={<AdminAddProduct />} />
          <Route path="/ordercreate/:total" element={<OrderCreate />} />
          <Route
            path="/adminorderdetail/:ordernumber"
            element={<AdminOrderDetail />}
          />
          <Route
            path="/userorderdetail/:ordernumber"
            element={<UserOrderDetail />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
