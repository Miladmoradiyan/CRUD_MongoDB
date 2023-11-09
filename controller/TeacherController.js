const TeacherModel = require("../models/Teachers");

// find for (:) fields //-

const teacherList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const teacher = await TeacherModel.find({}, projection);

  res.send({
    success: true,
    message: "لیست اساتید با موفقیت تولید شد",
    data: {
      teacher,
    },
  });
};

// add user //

const addTeacher = async (req, res, next) => {
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
    const newTeacher = new TeacherModel({
      first_name,
      last_name,
      mobile,
      email,
      password,
    });
    await newTeacher.save();
    res.status(201).send({
      success: true,
      message: "حساب جدید با موفقیت ایجاد شد",
      newUserID: newTeacher._id,
    });
  } catch (err) {
    next(err);
  }
};

// find for Id //

const teacherId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "استادی بااین مشخصات یافت نشد",
      });
    }
    const user = await TeacherModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        err: true,
        message: "استادی بااین مشخصات یافت نشد",
      });
    }
    return res.send({
      success: true,
      data: {
        teacher,
      },
    });
  } catch (err) {
    next(err);
  }
};

// delete user //

const removeTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "استادی بااین مشخصات یافت نشد",
      });
    }
    await TeacherModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "استاد با موفقیت حذف شد",
    });
  } catch (err) {
    next(err);
  }
};
const updateFieldTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "استادی بااین مشخصات یافت نشد",
      });
    }
    const { n, nModified } = await TeacherModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new err("عملیات به روزرسانی با خطا مواجه شد");
    }
    res.send({
      success: true,
      message: "استاد با موفقیت به روز رسانی شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  teacherList,
  addTeacher,
  teacherId,
  removeTeacher,
  updateFieldTeacher,
};
