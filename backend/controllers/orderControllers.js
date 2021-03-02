import AsyncHandler from "express-async-handler";
import Order from "../models/order.js";

//@description      creating order in db
//@route            POST /api/order
//@access           private level
const createOrderItems = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No ordered Items!! ");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).send(createdOrder);
  }
});

//@description      get order and order details
//@route            GET /api/order/:id
//@access           private level
const getOrderById = AsyncHandler(async (req, res) => {
  //populate is used to fetch other info related to first query

  // Yhat here in mongoose we have a clever function called populate() that we can chained to our previous request in order to directly get that information in our answer without explictly doing an additional request.
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).send(order);
  } else {
    res.status(404);
    throw new Error("Order not found!! ");
  }
});

//@description      update order status to piad
//@route            GET /api/order/:id/pay
//@access           private level
const updateOrderToPaid = AsyncHandler(async (req, res) => {
  //populate is used to fetch other info related to first query

  // Yhat here in mongoose we have a clever function called populate() that we can chained to our previous request in order to directly get that information in our answer without explictly doing an additional request.
  const order = await Order.findById(req.params.id);

  //the object below order.paymentResult is given by Paypal API
  if (order) {
    order.ispaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Payment cant't be completed !!");
  }
});

//@description      get logged in users orders
//@route            GET /api/order/myorders
//@access           private level
const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.json(orders);
});

//@description      get all orders
//@route            GET /api/order/allorders
//@access           private level / ADMIN
const getOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

//@description      update order status to delivered
//@route            GET /api/order/:id/deliver
//@access           private level / ADMIN
const updateOrderToDelivered = AsyncHandler(async (req, res) => {
  //populate is used to fetch other info related to first query

  // Yhat here in mongoose we have a clever function called populate() that we can chained to our previous request in order to directly get that information in our answer without explictly doing an additional request.
  const order = await Order.findById(req.params.id);

  //the object below order.paymentResult is given by Paypal API
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Delivery isn't updated!!");
  }
});

export {
  createOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
