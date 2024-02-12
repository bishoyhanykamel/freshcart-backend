const router = require("express").Router();
const controller = require("./../controllers/category.controller");

router.route("/").get(controller.getAllCategories);


module.exports = router;