const CoursModel = require("../models/Courses");

// find for (:) fields //-

const coursList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const Cours = await CoursModel.find({}, projection);

  res.send({
    success: true,
    message: "لیست دوره با موفقیت تولید شد",
    data: {
      Cours,
    },
  });
};

// add user //

const addCours = async (req, res, next) => {
  try {
    const {
      cours_name,
      title_name,
      teacherId,
      sub_categoryId,
      categoryId,
      price,
      time,
    } = req.body;

    const newCours = new CoursModel({
      cours_name,
      title_name,
      teacherId,
      sub_categoryId,
      categoryId,
      price,
      time,
    });
    await newCours.save();
    res.status(201).send({
      success: true,
      message: "دوره جدید با موفقیت ایجاد شد",
      newUserID: newCours._id,
    });
  } catch (err) {
    next(err);
  }
};

// find for Id //

const coursId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دوره ای بااین مشخصات یافت نشد",
      });
    }
    const user = await CoursModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        err: true,
        message: "دوره ای بااین مشخصات یافت نشد",
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

// delete course //

const removeCours = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دوره ای بااین مشخصات یافت نشد",
      });
    }
    await CoursModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "دوره با موفقیت حذف شد",
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
        message: "دوره ای بااین مشخصات یافت نشد",
      });
    }
    const { n, nModified } = await CoursModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new err("عملیات به روزرسانی با خطا مواجه شد");
    }
    res.send({
      success: true,
      message: "دوره با موفقیت به روز رسانی شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  coursList,
  addCours,
  coursId,
  removeCours,
  updateField,
};
