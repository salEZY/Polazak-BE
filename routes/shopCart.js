const express = require("express");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");

const router = express.Router();

// Show visible products GET
router.get("/", async (req, res) => {
  let products;
  try {
    products = await Product.find();
  } catch (error) {
    return res.status(500).json({ message: "Server error!" });
  }
  let filtered = products.filter((product) => product.visible != false);
  res.json(filtered);
});
// Add to cart POST
router.post(
  "/cart",
  [
    check("name").isString().isLength({ min: 2 }),
    check("price").isNumeric().not().equals("0"),
    check("quantity").isNumeric().not().equals("0"),
  ],
  async (req, res) => {
    // Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ message: "Invalid inputs passed, please check your data" });

    const { name, price, quantity } = req.body;
    // Finding a product
    let product;
    try {
      product = await Product.findOne({ name });
    } catch (error) {
      return res.status(500).json({ message: "Server error!" });
    }

    if (product.length === 0) {
      return res.status(403).json({ message: "Product does NOT exist!" });
    }
    // Check if there is enough quantity of product in stock
    if (quantity > product.quantity) {
      return res.status(403).json({
        message: `There is not enough product in stock! Current stock for ${product.name}: ${product.quantity}`,
      });
    }

    // Remove the price and quantity from the product
    let newQuantity = product.quantity - quantity;
    let newPrice = product.price - price;
    product.quantity = newQuantity;
    product.price = newPrice;
    try {
      await product.save();
    } catch (error) {
      return res.status(500).json({ message: "Server error!a" });
    }
    // Create cart details
    let cartedProduct = {
      name,
      price,
      quantity,
    };
    res.json({
      data: [product, cartedProduct],
      message: "You have completed the purchase!",
      details: `Details -> Name: ${name} , Price: ${price}(${product.price} x ${quantity})`,
    });
  }
);
module.exports = router;
