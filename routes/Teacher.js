const router = require("express").Router();

const TeacherController = require("../controller/TeacherController");
// const auth = require("../middlewares/Auth");
// router.use(auth);
router.get("/", TeacherController.teacherList);
router.post("/", TeacherController.addTeacher);
router.get("/:id", TeacherController.teacherId);
router.delete("/:id", TeacherController.removeTeacher);
router.patch("/:id", TeacherController.updateFieldTeacher);

module.exports = router;
