import express from "express";
import {
  createPetProduct,
  getPetProducts,
  getPetProduct,
  updatePetProduct,
  deletePetProduct,
} from "../controllers/petProduct.js";

import {
  createPetProductValidator,
  updatePetProductValidator,
} from "../validators/petProduct.validator.js";

import upload from "../config/multer.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  createPetProductValidator,
  createPetProduct
);
router.get("/", getPetProducts);
router.get("/:id", getPetProduct);
router.put(
  "/:id",
  upload.single("image"),
  updatePetProductValidator,
  updatePetProduct
);

router.delete("/:id", deletePetProduct);

export default router;
