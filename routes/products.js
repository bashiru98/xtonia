const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const { User } = require("../models/user");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        title: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};

  const products = await Product.find({ ...category, ...searchKeyword });
  res.send(products);
});
router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
});

router.post("/", [auth, admin], async (req, res) => {
  const product = new Product({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    numInStock: req.body.numInStock,
    image: req.body.image,
    numReviews: req.body.numReviews,
    rating: req.body.rating,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product created", data: newProduct });
  } else {
    res.status(500).send({ messages: "Error in creating product" });
  }
});
router.put("/:id", [auth, admin], async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.title = req.body.title;
    product.price = req.body.price;
    product.numInStock = req.body.numInStock;
    product.image = req.body.image;
    product.category = req.body.category;
  }
  const updatedProduct = await product.save();
  if (updatedProduct) {
    return res
      .status(200)
      .send({ message: "Product updated", data: updatedProduct });
  } else {
    res.status(500).send({ messages: "update product failed" });
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const removedProduct = await Product.findById(req.params.id);
  if (removedProduct) {
    await removedProduct.remove();
    res.send({ message: "product deleted" });
  } else {
    res.send("An error occured");
  }
});
module.exports = router;
