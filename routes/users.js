const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "bashiru",
      email: "bukariatulebashiru@gmail.com",
      password: "123456",
      isAdmin: true,
    });
    const adminUser = await user.save();
    res.send(adminUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find().select("-__v").sort("name");
  res.send(users);
});

// registering users

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token,
    });
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById(req.params.id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email),
      await user.save();
    const token = user.generateAuthToken();
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    return res.status(404).send("The user with the given ID was not found.");
  }
});

router.delete("/:id", [auth], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});
module.exports = router;
