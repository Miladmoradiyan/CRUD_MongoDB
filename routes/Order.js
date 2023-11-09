const router = require("express").Router();

const OrderController = require("../controller/OrderController");
// const auth = require("../middlewares/Auth");
// router.use(auth);
router.get("/", OrderController.OrderList);
router.post("/", OrderController.addOrder);
router.delete("/:id", OrderController.removeOrder);

module.exports = router;
