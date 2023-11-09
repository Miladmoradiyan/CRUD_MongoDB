const OrderModel = require("../models/Order");
// // list
const OrderList = async (req, res, next) => {
  let projection = {};
  if (req.query.hasOwnProperty("fields")) {
    projection = req.query.fields.split(":").reduce((total, current) => {
      return { [current]: 1, ...total };
    }, {});
  }
  const Order = await OrderModel.find({}, projection);
  res.send({
    success: true,
    message: "لیست سفارش با موفقیت تولید شد",
    data: {
      Order,
    },
  });
};

//add

const addOrder = async (req, res, next) => {
  try {
    const { studentId, coursId, totalPrice } = req.body;

    const newOrder = new OrderModel({
      studentId,
      coursId,
      totalPrice,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "سفارش جدید با موفقیت ایجاد شد",
      newUserID: newOrder._id,
    });
  } catch (err) {
    next(err);
  }
};

// delete

const removeOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        err: true,
        message: "سفارشی بااین مشخصات یافت نشد",
      });
    }
    await OrderModel.deleteOne({ _id: id });
    res.send({
      success: true,
      message: "سفارش با موفقیت حذف شد",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  OrderList,
  addOrder,
  removeOrder,
};
