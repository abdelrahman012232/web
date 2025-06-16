import { body } from "express-validator";

const allowedCategories = [
  "Food",
  "Toys",
  "Accessories",
  "Grooming",
  "Medicine",
  "Training",
  "Bedding",
  "Other",
];

export const createPetProductValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(allowedCategories)
    .withMessage(`Category must be one of: ${allowedCategories.join(", ")}`),
];

export const updatePetProductValidator = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("category")
    .optional()
    .isIn(allowedCategories)
    .withMessage(`Category must be one of: ${allowedCategories.join(", ")}`),
];
