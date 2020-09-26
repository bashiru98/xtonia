import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { register } from "./actions/userActions";
import "./Login.css";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo]);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ul className="form-container">
          <li>
            <h2>Register Here</h2>
          </li>
          <li>
            {loading && <Spinner />}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">User Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="repassword">Confirm Password</label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              onChange={(e) => setRepassword(e.target.value)}
            />
          </li>
          <li>
            <Button type="submit" className="button-primary">
              {" "}
              Register
            </Button>
          </li>
          <li className="text-tag">
            Have an account already?
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              className="button secondary text-center"
            >
              Login
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Register;
