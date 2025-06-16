import express from "express";
import PetProduct from "../models/petProduct.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Order from "../models/order.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Middleware to attach user from JWT token
router.use(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.locals.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate("cart.items.product");

    res.locals.user = user || null;
    next();
  } catch (error) {
    console.error("JWT middleware error:", error);
    res.locals.user = null;
    return next();
  }
});

// Home page (Paginated products)
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    PetProduct.find().skip(skip).limit(limit),
    PetProduct.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  res.render("index", {
    products,
    currentPage: page,
    totalPages,
  });
});

// Profile page with order history
router.get("/profile", auth(["user"]), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.render("profile", { user: req.user, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Server error");
  }
});

// Redirect user route to home
router.get("/user", async (req, res) => {
  res.redirect("/");
});

// Static pages
router.get("/about-us", async (req, res) => {
  res.render("about-us");
});

router.get("/contact-us", async (req, res) => {
  res.render("contact-us");
});

// Admin dashboard
router.get("/admin", auth(["admin"]), async (req, res) => {
  res.render("admin/dashboard");
});
router.get("/admin/users", auth(["admin"]), async (req, res) => {
  res.render("admin/users", {
    users: await User.find(),
  });
});
router.get("/admin/orders", auth(["admin"]), async (req, res) => {
  res.render("admin/orders", {
    orders: await Order.find().populate("user"),
  });
});
router.get("/admin/products", auth(["admin"]), async (req, res) => {
  res.render("admin/products", {
    products: await PetProduct.find(),
  });
});

export default router;
