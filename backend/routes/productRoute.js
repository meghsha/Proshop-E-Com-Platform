import express from "express";
const router = express.Router();
import { getProductById } from "../controllers/productController.js";
import { getProducts, createProduct, updateProduct, deleteProduct,
    getTopProducts, createProductReview } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
