import express from "express";
import {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addToCart,
  updateCartItem,
} from "../controllers/user.js";
import {
  createUserValidator,
  updateUserValidator,
} from "../validators/user.validator.js";

import auth from "../middlewares/auth.js";

const router = express.Router();

// Cart Routes (fixed for productId)
router.post("/cart", auth(["user"]), addToCart);
router.put("/cart/:productId", auth(["user"]), updateCartItem);

// Auth and User Management
router.post("/signup", createUserValidator, createUser);
router.post("/login", loginUser);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

// Admin or general access
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUserValidator, updateUser);
router.delete("/:id", deleteUser);

export default router;
