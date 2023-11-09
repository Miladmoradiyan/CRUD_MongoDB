const router = require("express").Router();

const CoursController = require("../controller/CourseController");
// const auth = require("../middlewares/Auth");
// router.use(auth);
router.get("/", CoursController.coursList);
router.post("/", CoursController.addCours);
router.get("/:id", CoursController.coursId);
router.delete("/:id", CoursController.removeCours);
router.patch("/:id", CoursController.updateField);

module.exports = router;
