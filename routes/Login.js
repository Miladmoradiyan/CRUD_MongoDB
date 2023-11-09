const router = require("express").Router();
const LoginController = require("../controller/LoginController");

router.post("/login", LoginController.newlogin);
router.post("/admin", LoginController.NewLogionAdmin);

module.exports = router;
