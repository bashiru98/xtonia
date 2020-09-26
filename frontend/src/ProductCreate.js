import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  listProducts,
  saveProduct,
  deleteProduct,
} from "./actions/productAction";

import "./ProductCreate.css";
import Spinner from "./Spinner";
function ProductCreate(props) {
  const [visibility, setVisibility] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [numInStock, setNumInStock] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({ _id: id, title, price, numInStock, image, category })
    );
  };
  const handleDelete = (product) => {
    dispatch(deleteProduct(product._id));
  };
  useEffect(() => {
    if (successSave) {
      setVisibility(false);
    }
    dispatch(listProducts());
  }, [successSave, successDelete]);
  const openModelView = (product) => {
    setVisibility(true);
    setId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setImage(product.image);
    setNumInStock(product.numInStock);
    setCategory(product.category);
  };
  return (
    <div className="content content-margine">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModelView({})}>
          Create Product
        </button>
      </div>
      {visibility && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <ul className="form-container">
              <li>
                <h2>Create New Product</h2>
              </li>
              <li>
                {loadingSave && <Spinner />}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  value={title}
                  type="title"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  value={category}
                  type="category"
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  value={price}
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  value={image}
                  type="text"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor="numInStock">Number in Stock</label>
                <input
                  value={numInStock}
                  type="text"
                  name="numInStock"
                  id="numInStock"
                  onChange={(e) => setNumInStock(e.target.value)}
                />
              </li>

              <li>
                <button type="submit" className="button-primary">
                  {" "}
                  {id ? "Update" : "Create"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setVisibility(false)}
                  type="submit"
                  className="button-secondary"
                >
                  {" "}
                  Hide Form
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.price}</td>
                <td>{product.numInStock}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => openModelView(product)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductCreate;
