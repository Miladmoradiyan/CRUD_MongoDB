const AdminModel = require("../models/Admin");

// find for (:) fields //-

const AdminList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const admin = await AdminModel.find({}, projection);
  res.send({
    success: true,
    message: "لیست ادمین با موفقیت تولید شد",
    data: {
      admin,
    },
  });
};

// add user //

const addAdmin = async (req, res, next) => {
  try {
    const { user_name, password, role } = req.body;
    if (
      user_name == undefined ||
      password == undefined ||
      role == undefined ||
      user_name === "" ||
      password === "" ||
      role === ""
    ) {
      return res.status(422).send({
        err: true,
        message: "اطلاعات ارسالی برای ایجاد معتبر نمی باشد",
      });
    }
    const newStudent = new AdminModel({
      user_name,
      password,
      role,
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

const AdminId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "ادمین بااین مشخصات یافت نشد",
      });
    }
    const user = await AdminModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        err: true,
        message: "ادمین بااین مشخصات یافت نشد",
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

const removeAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "ادمین بااین مشخصات یافت نشد",
      });
    }
    await AdminModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "ادمین با موفقیت حذف شد",
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
        message: "ادمین بااین مشخصات یافت نشد",
      });
    }
    const { n, nModified } = await AdminModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new err("عملیات به روزرسانی با خطا مواجه شد");
    }
    res.send({
      success: true,
      message: "ادمین با موفقیت به روز رسانی شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  AdminList,
  addAdmin,
  AdminId,
  removeAdmin,
  updateField,
};
