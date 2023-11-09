const TokenServices = require("../services/Token");
const UserModel = require("../models/User");
const AdminModel = require("../models/Admin");
const newlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send({
        status: "err",
        code: 404,
        message: "آدرس ایمیل یا کلمه عبور اشتباه است",
      });
    }
    const token = TokenServices.sign({ id: user._id });
    res.send({
      status: "success",
      code: 200,
      token,
    });
  } catch (err) {
    next(err);
  }
};
const NewLogionAdmin = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    const admin = await AdminModel.findOne({ user_name, password });
    if (!admin) {
      return res.status(404).send({
        status: "err",
        code: 404,
        message: "نام کاربری یا کلمه عبور اشتباه است",
      });
    }
    const token = TokenServices.sign({ id: admin._id });
    res.send({
      status: "success",
      code: 200,
      token,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  newlogin,
  NewLogionAdmin,
};
