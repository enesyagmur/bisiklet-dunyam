import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { Suspense, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { useDispatch } from "react-redux";
import { addProductsToRedux } from "./redux/productsSlice";
import { Toaster } from "react-hot-toast";
// 21.3mb  2.74s

const Products = React.lazy(() => import("./pages/Products"));
const Account = React.lazy(() => import("./pages/Account/Account"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AdminOrders = React.lazy(() => import("./pages/Admin/AdminOrders"));
const AdminProducts = React.lazy(() => import("./pages/Admin/AdminProducts"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Basket = React.lazy(() => import("./pages/Basket"));
const UserOrderDetail = React.lazy(() =>
  import("./pages/Account/UserOrderDetail")
);
const AdminAddProduct = React.lazy(() =>
  import("./pages/Admin/AdminAddProduct")
);
const OrderCreate = React.lazy(() => import("./pages/Order/OrderCreate"));
const AdminOrderDetail = React.lazy(() =>
  import("./pages/Admin/AdminOrderDetail")
);
//11.1mb 888ms

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
        <Suspense fallback={<p>Yükleniyor...</p>}>
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
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
