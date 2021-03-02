import express from "express";
import {
  getPtoductByID,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getProducts,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//@description      fetch all products
//@route            GET /api/products/
//@access           public level

router.route("/").get(getProducts).post(protect, admin, createProduct);

//@description      create new review
//@route            post /api/products/:id/reviews
//@access           private level

router.route("/:id/reviews").post(protect, createProductReview);
//@description      fetch single products & another route to provide deletion by admin
//@route            GET /api/products/:id & delete request also
//@access           public level & a private, ADMIN level route as well
router
  .route("/:id")
  .get(getPtoductByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
