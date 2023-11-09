const router = require("express").Router();

const CategoryController = require("../controller/CategoryController");
// const auth = require("../middlewares/Auth");
// router.use(auth);
router.get("/", CategoryController.CategoryList);
router.post("/", CategoryController.addCategory);
router.get("/:id", CategoryController.CategoryId);
router.delete("/:id", CategoryController.removeCategory);
router.patch("/:id", CategoryController.updateField);

module.exports = router;
