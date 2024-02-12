const router = require("express").Router();
const productsController = require("./../controllers/product.controller");

router.route("/").get(productsController.getAllProducts);

module.exports = router;
