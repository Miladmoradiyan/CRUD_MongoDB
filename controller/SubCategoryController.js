const SubCategoryModel = require("../models/SubCategory");

// find for (:) fields //-

const SubCategoryList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const SubCategory = await SubCategoryModel.find({}, projection);

  res.send({
    success: true,
    message: "لیست کالکشن با موفقیت تولید شد",
    data: {
      SubCategory,
    },
  });
};

// add user //

const addSubCategory = async (req, res, next) => {
  try {
    const { categoryId, name_subcategory, title_subcategory } = req.body;

    const newSubCategory = new SubCategoryModel({
      categoryId,
      name_subcategory,
      title_subcategory,
    });
    await newSubCategory.save();
    res.status(201).send({
      success: true,
      message: "کالکشن جدید با موفقیت ایجاد شد",
      newUserID: newSubCategory._id,
    });
  } catch (err) {
    next(err);
  }
};

// find for Id //

const SubCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "کالکشنی بااین مشخصات یافت نشد",
      });
    }
    const user = await SubCategoryModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).send({
        err: true,
        message: "کالکشنی بااین مشخصات یافت نشد",
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

const removeSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "کالکشنی بااین مشخصات یافت نشد",
      });
    }
    await SubCategoryModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "کالکشن با موفقیت حذف شد",
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
        message: "کالکشنی بااین مشخصات یافت نشد",
      });
    }
    const { n, nModified } = await SubCategoryModel.updateOne(
      { _id: id },
      { ...req.body }
    );
    if (n === 0 || nModified === 0) {
      throw new err("عملیات به روزرسانی با خطا مواجه شد");
    }
    res.send({
      success: true,
      message: "کالکشن با موفقیت به روز رسانی شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  SubCategoryList,
  addSubCategory,
  SubCategoryId,
  removeSubCategory,
  updateField,
};
