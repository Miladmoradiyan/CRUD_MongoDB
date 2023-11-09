const router = require("express").Router();

const AdminController = require("../controller/AdminController");
// const auth = require("../middlewares/Auth");
// router.use(auth);
router.get("/", AdminController.AdminList);
router.post("/", AdminController.addAdmin);
router.get("/:id", AdminController.AdminId);
router.delete("/:id", AdminController.removeAdmin);
router.patch("/:id", AdminController.updateField);

module.exports = router;
