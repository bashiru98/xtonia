import React, { useState, useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { saveShipping } from "./actions/cartAction";
import "./Login.css";

import CheckoutSteps from "./CheckoutSteps";

function Shipping(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push("/payment");
  };

  return (
    <Fragment>
      <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <ul className="form-container">
              <li>
                <h2>Shipping</h2>
              </li>

              <li>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                />
              </li>

              <li>
                <Button type="submit" className="button-primary">
                  {" "}
                  Continue
                </Button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
