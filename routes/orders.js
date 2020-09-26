const express = require("express");
const auth = require("../middleware/auth");
const { Order } = require("../models/order");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/mine", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});
router.get("/:id", auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order not found");
  }
});
router.get("/", auth, async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.send(orders);
});
router.get("/:id", auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order not found");
  }
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const removedOrder = await order.remove();
    res.send(removedOrder);
  } else {
    res.status(404).send("Order not found");
  }
});
router.post("/", auth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ msg: "New Order Created", data: newOrderCreated });
});

module.exports = router;
