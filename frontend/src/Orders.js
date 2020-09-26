import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listOrders, deleteOrder } from "./actions/orderAction";

import "./ProductCreate.css";
import Spinner from "./Spinner";
function Orders(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;
  const dispatch = useDispatch();

  const handleDelete = (order) => {
    dispatch(deleteOrder(order._id));
  };
  useEffect(() => {
    dispatch(listOrders());
  }, [successDelete]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <div className="content content-margine">
      <div className="product-header">
        <h3>Total Orders</h3>
      </div>

      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>TotalPrice</th>
              <th>User</th>
              <th>Paid</th>
              <th>Paid At</th>
              <th>Delivered</th>
              <th>Delivered At</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.user.name}</td>
                <td>{order.paid.toString()}</td>
                <td>{order.paidAt}</td>
                <td>{order.delivered.toString()}</td>
                <td>{order.deliveredAt}</td>
                <td>
                  <Link to={"/order/" + order._id} className="button secondary">
                    View Order
                  </Link>{" "}
                  <button
                    type="button"
                    onClick={() => handleDelete(order)}
                    className="button secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
