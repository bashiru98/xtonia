import React from "react";
import { Link } from "react-router-dom";
import "./CartDetails.css";
import { removeFromCartAction } from "./actions/cartAction";
import { useDispatch } from "react-redux";
import { addToCart } from "./actions/cartAction";
import Rating from "./Rating";
function CartDetails({
  id,
  title,
  price,
  image,
  rating,
  qty,
  productId,
  numInStock,
}) {
  const dispatch = useDispatch();

  const removeFromCart = (productId) => {
    dispatch(removeFromCartAction(productId));
  };
  return (
    <div className="checkout-product">
      <Link to={`/product/${id}`}>
        <img className="checkoutProduct-image" src={image} alt="" />
      </Link>

      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>

        <p className="checkoutProduct-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
          <Rating value={numReviews} />
        </div>
        <div>
          Qty:
          <select value={qty} onChange={(e) => addToCart(id, e.target.value)}>
            {[...Array(numInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => removeFromCart(id)}>Remove from cart</button>
      </div>
    </div>
  );
}

export default CartDetails;
