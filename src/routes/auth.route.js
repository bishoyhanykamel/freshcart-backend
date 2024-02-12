const router = require("express").Router();
const controller = require("./../controllers/auth.controller");

router.route("/login").post(controller.login);

router.route("/signup").post(controller.signup);

module.exports = router;
