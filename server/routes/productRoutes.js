const express = require("express");
const { addProduct, getProducts } = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("/", getProducts);

module.exports = router;