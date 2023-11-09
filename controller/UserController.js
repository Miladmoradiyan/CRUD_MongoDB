const UserModel = require("../models/User");

// find for (:) fields //-

const studentList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const student = await UserModel.find({}, projection);
  res.send({
    success: true,
    message: "لیست دانشجویان با موفقیت تولید شد",
    data: {
      student,
    },
  });
};

// add user //

const addStudent = async (req, res, next) => {
  try {
    const { first_name, last_name, mobile, email, password } = req.body;
    if (
      first_name == undefined ||
      last_name == undefined ||
      mobile == undefined ||
      email == undefined ||
      password == undefined ||
      first_name === "" ||
      last_name === "" ||
      mobile === "" ||
      password === "" ||
      email === ""
    ) {
      return res.status(422).send({
        err: true,
        message: "اطلاعات ارسالی برای ایجاد معتبر نمی باشد",
      });
    }
    const newStudent = new UserModel({
      first_name,
      last_name,
      mobile,
      email,
      password,
    });
    await newStudent.save();
    res.status(201).send({
      success: true,
      message: "حساب جدید با موفقیت ایجاد شد",
      newUserID: newStudent._id,
    });
  } catch (err) {
    next(err);
  }
};

// find for Id //

const studentId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دانشجویی بااین مشخصات یافت نشد",
      });
    }
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        err: true,
        message: "دانشجویی بااین مشخصات یافت نشد",
      });
    }
    return res.send({
      success: true,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// delete user //

const removeStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دانشجویی بااین مشخصات یافت نشد",
      });
    }
    await UserModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "دانشجو با موفقیت حذف شد",
    });
  } catch (err) {
    next(err);
  }
};

const updateField = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دانشجویی بااین مشخصات یافت نشد",
      });
    }
    const { n, nModified } = await UserModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new err("عملیات به روزرسانی با خطا مواجه شد");
    }
    res.send({
      success: true,
      message: "دانشجو با موفقیت به روز رسانی شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  studentList,
  addStudent,
  studentId,
  removeStudent,
  updateField,
};
