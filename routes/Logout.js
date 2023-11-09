const router = require("express").Router();
const LogoutController = require("../controller/LogoutController");
router.post("/logout", LogoutController.logout);

module.exports = router;
