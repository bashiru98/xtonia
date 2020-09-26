import "./PlaceOrder.css";
import Button from "@material-ui/core/Button";
import "./CartDetails.css";
import { Link } from "react-router-dom";
import React, { useEffect, Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "./CheckoutSteps";
import { createOrder } from "./actions/orderAction";
function PlaceOrder(props) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  }
  if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, b) => a + b.price * b.qty, 0);

  const shippingPrice = itemsPrice < 100 ? 0 : 0.2 * itemsPrice;
  const taxPrice = 0.05 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4>
        {" "}
      </CheckoutSteps>
      <div className="cart-main">
        <div className="checkout-left">
          <Fragment>
            <div>
              <h2 className="checkout-title">Order Items</h2>

              {cartItems.map((item) => (
                <div key={item.product} className="checkout-product">
                  <Link to={`/product/${item.product}`}>
                    <img
                      className="checkoutProduct-image"
                      src={item.image}
                      alt=""
                    />
                  </Link>

                  <div className="checkoutProduct-info">
                    <p className="checkoutProduct-title">{item.title}</p>

                    <p className="checkoutProduct-price">
                      <small>$</small>
                      <strong>{item.price}</strong>
                    </p>
                    <p>
                      <small>Qty:</small>
                      <strong>{item.qty}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        </div>
        <div className="right-cards">
          <div className="checkout-right">
            <div className="subtotal-a">
              <Button className="order-button" onClick={handlePlaceOrder}>
                Place Order
              </Button>
              <ul>
                <li>
                  <h3>Order Summary</h3>
                </li>
                <li>
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </li>
                <li>
                  <div>Order Total</div>
                  <div>${totalPrice}</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="checkout-right">
            <div className="subtotal-b">
              <div className="payment-method">
                <h3>Payment Method:</h3>
                <p className="paypal">{cart.payment.paymentMethod}</p>
              </div>
              <div className="shipping-adress-section-main">
                <h3>Shipping Address</h3>
                <div className="shipping-adress-section-sub">
                  <p>
                    {cart.shipping.address},{cart.shipping.city},
                    {cart.shipping.postalCode}, {cart.shipping.country},
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlaceOrder;
