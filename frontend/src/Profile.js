import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { update } from "./actions/userActions";
import { listMyOrders } from "./actions/orderAction";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;
  const userSignIn = useSelector((state) => state.userSignIn);
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: orderErrors } = myOrderList;
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, name, email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
  }, [userInfo]);
  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <ul className="form-container">
              <li>
                <h2> User Profile</h2>
              </li>
              <li>
                {loading && <Spinner />}
                {error && <div>{error}</div>}
              </li>
              <li>
                <label htmlFor="name">User Name</label>

                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>

              <li>
                <Button type="submit" className="button-primary">
                  {" "}
                  Update
                </Button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margine">
        {loadingOrders ? (
          <div>loading...</div>
        ) : orderErrors ? (
          <div>{orderErrors}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.paid}</td>
                  <td>
                    <Link to={"/order/" + order._id}> Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Profile;
