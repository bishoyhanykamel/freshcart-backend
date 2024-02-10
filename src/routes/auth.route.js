const router = require("express").router();
const controller = require("./../controllers/auth.controller");

router.route("/users/login").post(controller.login);

router.route("/users/signup").post(controller.signup);

module.exports = router;
