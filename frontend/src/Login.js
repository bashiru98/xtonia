import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Button from "@material-ui/core/Button";
import { sigin } from "./actions/userActions";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, userInfo, error } = userSignIn;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sigin(email, password));
  };
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history]);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Login Here</h2>
          </li>
          <li>
            {loading && <Spinner />}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <Button type="submit" className="button-primary">
              {" "}
              Signin
            </Button>
          </li>
          <li className="text-tag">New to this site?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center"
            >
              Create New Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Login;
