import "./Order.css";
import Button from "@material-ui/core/Button";
import "./CartDetails.css";
import { Link } from "react-router-dom";
import React, { useEffect, Fragment } from "react";
import { addToCart } from "./actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import Spinner from "./Spinner";
import { removeFromCartAction } from "./actions/cartAction";

import Subtotal from "./Subtotal";
import CheckoutSteps from "./CheckoutSteps";
import { detailsOrder, payOrder } from "./actions/orderAction";
import PaypalButton from "./PaypalButton";
function Order(props) {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {};
  }, [successPay]);
  const handleSuccess = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  return loading ? (
    <Spinner />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="cart-main">
        <div className="checkout-left">
          <Fragment>
            <div>
              <h2 className="checkout-title">Order Items</h2>

              {order.orderItems.map((item) => (
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
              {!order.isPaid && (
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccess}
                />
              )}

              <ul>
                <li>
                  <h3>Order Summary</h3>
                </li>
                <li>
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </li>
                <li>
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </li>
                <li>
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </li>
                <li>
                  <div>Order Total</div>
                  <div>${order.totalPrice}</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="checkout-right">
            <div className="subtotal-b">
              <div className="payment-method">
                <h3>Payment Method:</h3>
                <p className="paypal">{order.payment.paymentMethod}</p>
              </div>
              <div>{order.paid ? "Paid at" + order.paidAt : "Not Paid"}</div>
              <div className="shipping-adress-section-main">
                <h3>Shipping Address</h3>
                <div className="shipping-adress-section-sub">
                  <p>
                    {order.shipping.address},{order.shipping.city},
                    {order.shipping.postalCode}, {order.shipping.country},
                  </p>
                </div>
                <div>
                  {order.delivered
                    ? "Delivered at" + order.deliveredAt
                    : "Not Delivered"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Order;
