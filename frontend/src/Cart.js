import "./Cart.css";
import Button from "@material-ui/core/Button";
import "./CartDetails.css";
import { Link } from "react-router-dom";
import React, { useEffect, Fragment } from "react";
import { addToCart } from "./actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { removeFromCartAction } from "./actions/cartAction";

import Subtotal from "./Subtotal";
function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);
  const removeFromCart = (productId) => {
    dispatch(removeFromCartAction(productId));
  };
  const handleCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart-main">
      <div className="checkout-left">
        {cartItems.length === 0 ? (
          <div>
            <h2>Your shopping cart is empty</h2>
            <p>
              {" "}
              You have no items in your cart, To buy one or more items " click
              on add to cart next to the item"
            </p>
          </div>
        ) : (
          <Fragment>
            <div>
              <h2 className="checkout-title">Your shopping cart</h2>

              {cartItems.map((item) => (
                <div key={item.product} className="checkout-product">
                  <Link to="#">
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
                    <div className="checkoutProduct-rating">
                      {Array(item.rating)
                        .fill()
                        .map((_, index) => (
                          <p key={index}>⭐</p>
                        ))}
                    </div>

                    <Button onClick={() => removeFromCart(item.product)}>
                      Remove from cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="checkout-right">
          <div className="subtotal">
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :<strong>{`${value}`}</strong>{" "}
                  </p>
                  <small className="subtotal-gift">
                    <input type="checkbox" /> This order contains a gift
                  </small>
                </>
              )}
              decimalScale={2}
              value={cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <Button onClick={handleCheckout}>Proceed to checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
