import { body } from "express-validator";

export const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2-50 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 18 })
    .withMessage("Password must be at least 6 characters"),
];

export const updateUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").optional().isLength({ min: 6 }),
  body("role").isIn(["user", "admin"]).withMessage("Invalid role"),
];
