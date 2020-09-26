import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { listProducts } from "./actions/productAction";
import Spinner from "./Spinner";
import { useSelector, useDispatch } from "react-redux";
import "./Product.css";
// import data from "./data";

const Product = ({ category }) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
  }, [category, listProducts]);
  return loading ? (
    <Spinner />
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Fragment>
      <div className="content">
        <ul className="products">
          {products.map((product) => (
            <Fragment key={product._id}>
              <li>
                <div className="product">
                  <Link to={`/products/${product._id}`}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt=""
                    ></img>
                  </Link>
                  <div className="product-name">
                    <Link
                      to={`/products/${product._id}`}
                      className="product-name-link"
                    >
                      {product.title}
                    </Link>
                  </div>

                  <div className="price">
                    <strong>${product.price}</strong>
                  </div>
                  <div className="product-rating">
                    {Array(product.rating)
                      .fill()
                      .map((_, index) => (
                        <p key={index}>⭐</p>
                      ))}
                    ({product.numReviews} reviews )
                  </div>
                </div>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Product;
