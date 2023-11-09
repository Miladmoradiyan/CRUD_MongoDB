const CategoryModel = require("../models/Category");

// find for (:) fields //-

const CategoryList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const Category = await CategoryModel.find({}, projection);

  res.send({
    success: true,
    message: "لیست دسته بندی با موفقیت تولید شد",
    data: {
      Category,
    },
  });
};

// add user //

const addCategory = async (req, res, next) => {
  try {
    const { name_category, title_category } = req.body;

    const newCategory = new CategoryModel({
      name_category,
      title_category,
    });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "دسته بندی جدید با موفقیت ایجاد شد",
      newUserID: newCategory._id,
    });
  } catch (err) {
    next(err);
  }
};

// find for Id //

const CategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دسته بندی بااین مشخصات یافت نشد",
      });
    }
    const user = await CategoryModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        err: true,
        message: "دسته بندی بااین مشخصات یافت نشد",
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

const removeCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "دسته بندی بااین مشخصات یافت نشد",
      });
    }
    await CategoryModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "دسته بندی با موفقیت حذف شد",
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
        message: "دسته بندی بااین مشخصات یافت نشد",
      });
    }
    const { n, nModified } = await CategoryModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new err("عملیات به روزرسانی با خطا مواجه شد");
    }
    res.send({
      success: true,
      message: "دسته بندی با موفقیت به روز رسانی شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  CategoryList,
  addCategory,
  CategoryId,
  removeCategory,
  updateField,
};
