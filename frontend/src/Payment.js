import React, { useState, useEffect, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { savePayment } from "./actions/cartAction";
import "./Login.css";

import CheckoutSteps from "./CheckoutSteps";

function Payment(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder");
  };

  return (
    <Fragment>
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <ul className="form-container">
              <li>
                <h2>Payment</h2>
              </li>

              <li>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paymentMethod">Paypal</label>
                </div>
              </li>
              <li>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="mastercard"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paymentMethod">MasterCard</label>
                </div>
              </li>
              <li>
                <button type="submit" className="button primary">
                  Continue
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Payment;
