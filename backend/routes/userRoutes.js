import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  registerUser,
  updateUserProfile,
  updateUser,
  getUser,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//@description      Register new user
//@route            GET /api/user/
//@access           public level
router.route("/").post(registerUser).get(protect, getUser);

//@description      loging in user
//@route            POST /api/user/login
//@access           public level
router.post("/login", authUser);

//@description      Get user profile
//@route            GET /api/user/profile
//@access           private level
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//@description      delete a user
//@route            delete /api/user/:id
//@access           private level / ADMIN
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
