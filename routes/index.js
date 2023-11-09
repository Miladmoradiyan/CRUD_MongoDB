const studentRoutes = require("./Register");
const teacherRoutes = require("./Teacher");
const CoursRoutes = require("./Course");
const RegisterRoutes = require("./Order");
const SessionRouter = require("./Login");
const CategoryRouter = require("./Category");
const SubCategoryRouter = require("./SubCategory");
const AdminRouter = require("./Admin");

// const auth = require("../middlewares/auth");
module.exports = (app) => {
  app.use("/api/v1/users", studentRoutes);
  app.use("/api/v1/teachers", teacherRoutes);
  app.use("/api/v1/courses", CoursRoutes);
  app.use("/api/v1/order", RegisterRoutes);
  app.use("/api/v1/session", SessionRouter);
  app.use("/api/v1/category", CategoryRouter);
  app.use("/api/v1/subcategory", SubCategoryRouter);
  app.use("/api/v1/admin", AdminRouter);
};
