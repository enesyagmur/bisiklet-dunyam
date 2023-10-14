import React, { useEffect, useState } from "react";
import "../Admin/adminStyles/adminmain.css";
import "../Admin/adminStyles/adminorders.css";
import AdminPanel from "./AdminPanel";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orderList, setOrderList] = useState();

  const navigate = useNavigate();

  const goOrderDetail = (number) => {
    navigate(`/adminorderdetail/${number}`);
  };

  const getAllOrdersFunc = async () => {
    try {
      const ordersData = await getDocs(collection(db, "orders"));
      const orders = ordersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOrderList(orders);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAllOrdersFunc();
  }, []);

  return (
    <div className="admin-page">
      <AdminPanel />
      <div className="admin-page-main">
        <div className="admin-order-list">
          {orderList
            ? orderList.map((order) => (
                <>
                  <div
                    className="admin-order"
                    onClick={() => goOrderDetail(order.orderNumber)}
                  >
                    <p className="order-number">#{order.orderNumber}</p>
                    <p className="order-create-time">{order.orderCreateTime}</p>
                    <p className="order-total">{order.orderTotal}TL</p>
                    <p className="order-pay-state">{order.orderStatus}</p>
                  </div>
                </>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
