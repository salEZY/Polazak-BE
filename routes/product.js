const express = require("express");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const adminVerify = require("../util/adminVerify");

const router = express.Router();

// Middleware for admin check
router.use(adminVerify);

// Show all products GET
router.get("/", async (req, res) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
  res.json({ products });
});

// Add product POST
router.post(
  "/add",
  [
    check("name").isString().isLength({ min: 2 }),
    check("price").isNumeric().not().equals("0"),
    check("quantity").isNumeric().not().equals("0"),
    check("visible").isBoolean(),
  ],
  async (req, res) => {
    // Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });

    // Getting data from body
    const { name, price, quantity, visible } = req.body;

    // Finding a product
    let product;
    try {
      product = await Product.find({ name });
    } catch (error) {
      return res.status(500).json({ message: "Server error!" });
    }
    if (product.name === name)
      return res.status(403).json({ message: "Product already exists!" });

    let addedPrice = price * quantity;

    // Saving product
    const newProduct = {
      name,
      price: addedPrice,
      quantity,
      visible,
      creator: req.userData.userId,
    };

    product = new Product(newProduct);
    try {
      await product.save();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Product could NOT be saved!" });
    }
    res.json({ product, message: "Product added!" });
  }
);

// Edit Product PATCH
router.patch(
  "/:productId/edit",
  [
    check("name").isString().isLength({ min: 2 }),
    check("price").isNumeric().not().equals("0"),
    check("quantity").isNumeric().not().equals("0"),
    check("visible").isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });
    const productId = req.params.productId;
    // Getting data from body
    const { name, price, quantity, visible } = req.body;

    // Finding a product
    let product;
    try {
      product = await Product.findById({ _id: productId });
    } catch (error) {
      return res.status(500).json({ message: "Server Error!" });
    }
    if (!product)
      return res.status(403).json({ message: "Product could NOT be found!" });

    if (name) product.name = name;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (product.visible !== visible) product.visible = visible;

    try {
      await product.save();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Product could NOT be edited!" });
    }
    res.json({ product, message: "Product edited!" });
  }
);

// Delete product DELETE
router.delete("/:productId/delete", async (req, res) => {
  const productId = req.params.productId;
  // Finding a product
  let product;
  try {
    product = await Product.findById({ _id: productId });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }

  if (!product)
    return res.status(403).json({ message: "Product could NOT be found!" });

  try {
    await product.deleteOne();
  } catch (error) {
    return res.status(500).json({ message: "Product could NOT be deleted!" });
  }
  res.json({ message: "Product deleted!" });
});

module.exports = router;
