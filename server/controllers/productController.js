const Product = require("../models/Product");

// Add product
exports.addProduct = async (req, res) => {
  console.log("BODY:", req.body);

  const product = await Product.create(req.body);
  res.json(product);
};

// Get products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};