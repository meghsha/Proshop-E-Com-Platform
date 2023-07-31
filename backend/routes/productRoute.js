import express from "express";
const router = express.Router();
import { getProductById } from "../controllers/productController.js";
import { getProducts, createProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById);

export default router;
