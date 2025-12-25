import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/create", authMiddleware, createProduct);
router.get("/", authMiddleware, getProducts);

export default router;
