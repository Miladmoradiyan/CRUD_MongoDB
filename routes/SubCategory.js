const router = require("express").Router();

const SubCategoryController = require("../controller/SubCategoryController");
// const auth = require("../middlewares/Auth");
// router.use(auth);
router.get("/", SubCategoryController.SubCategoryList);
router.post("/", SubCategoryController.addSubCategory);
router.get("/:id", SubCategoryController.SubCategoryId);
router.delete("/:id", SubCategoryController.removeSubCategory);
router.patch("/:id", SubCategoryController.updateField);

module.exports = router;
