const router = require("express").Router();

const StudentController = require("../controller/UserController");
const auth = require("../middlewares/Admin");
const AdminToken = require("../middlewares/AuthAdmin");
const UserToken = require("../middlewares/Auth");
//router.use(AdminToken);
//router.use(UserToken);
router.get("/", StudentController.studentList);
router.post("/", StudentController.addStudent);
router.get("/:id", StudentController.studentId);
router.delete("/:id", StudentController.removeStudent);
router.patch("/:id", StudentController.updateField);

module.exports = router;
