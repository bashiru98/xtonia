import "./Products.css";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productForDetail } from "./actions/productAction";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function ProductDetail(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productForDetail(props.match.params.id));
  }, []);
  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id} ?qty=${qty}`);
  };
  return (
    <div className="products-main">
      <div className="product-left">
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <h2 className="product-td">
          <Link className="detail-product-link" to="/">
            Back to Results
          </Link>{" "}
        </h2>
        {loading ? (
          <Spinner />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="product-detail-sub">
            <img className="product-detail-image" src={product.image} alt="" />
            <div className="product-info">
              <p className="product-detail-title">{product.title}</p>
              <p className="product-detail-price">
                {" "}
                price:<small>$</small>
                <strong>{product.price}</strong>
              </p>
              <div className="product-detail-rating">
                {Array(product.rating)
                  .fill()
                  .map((_, index) => (
                    <p key={index}>⭐</p>
                  ))}
              </div>
              <div>
                Description:
                <b>{product.description}</b>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="detail-right">
          <div className="details-action">
            <ul>
              <li>
                Price: $<strong>{product.price}</strong>
              </li>
              <li>
                <div className="availability">
                  Status:
                  {product.numInStock > 0 ? (
                    <div className="av-status">Available</div>
                  ) : (
                    <div>not in stock</div>
                  )}
                </div>
              </li>
              <li>
                <div className="option-array">
                  Qty:{" "}
                  <select
                    className="select-option"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.numInStock).keys()].map((x) => (
                      <option className="option" key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </li>

              <li>
                {product.numInStock > 0 ? (
                  <Button onClick={handleAddToCart}>Add to Cart</Button>
                ) : (
                  <div>Not in Stock</div>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
