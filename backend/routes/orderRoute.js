import {
    createOrder, getMyOrders, getOrderById, updateOrderToPaid, getOrders, updateOrderToDelivered
  } from "../controllers/orderController.js";
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
  
const router = express.Router();
  
router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
  
export default router;