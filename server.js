const dotenv = require("dotenv");
const express = require("express");
const ConnectDB = require("./util/database");
const UserDB = require("./models/User");
const TeacherDB = require("./models/Teachers");
const CourseDB = require("./models/Courses");
const OrderDB = require("./models/Order");
const CategoryDB = require("./models/Category");
const SubCategoryDB = require("./models/SubCategory");
const AdminDB = require("./models/Admin");

const app = express();

dotenv.config();

ConnectDB();
UserDB();
TeacherDB();
CourseDB();
OrderDB();
CategoryDB();
SubCategoryDB();
AdminDB();

require("./middlewares/index")(app); // miidlewares
require("./routes/index")(app); // user
require("./middlewares/Exception")(app); // err 500 server
require("./middlewares/404")(app); // err 404 not found

app.use(express.json());

app.listen(5000, () => console.log("Connected on port 5000"));
