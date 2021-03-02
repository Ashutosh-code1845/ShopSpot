import express from "express";
import {
  createOrderItems,
  getOrders,
  getMyOrders,
  // getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//the order of routes should be same as below because
// I think the problem is because when you placed (/:id) above the (/myorder),
// then you input the URL with /.../myorders, Route will consider myorders as an id, and it is not a type of ObjectId

//@description      creating order in db
//@route            POST /api/order
//@access           private level

router
  .route("/")
  .post(protect, createOrderItems)
  .get(protect, admin, getOrders);

//@description      get logged in users orders
//@route            GET /api/order/myorders
//@access           private level

router.route("/myorders").get(protect, getMyOrders);

//@description      get order and order details
//@route            GET /api/order/:id
//@access           private level

router.route("/:id").get(protect, getOrderById);

//@description      update order status to paid
//@route            GET /api/order/:id/pay
//@access           private level

router.route("/:id/pay").put(protect, updateOrderToPaid);

//@description      update order status to delivered
//@route            GET /api/order/:id/deliver
//@access           private level / ADMIN
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
