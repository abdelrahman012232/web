import PetProduct from "../models/petProduct.js";
import { validationResult } from "express-validator";

export const createPetProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const productData = {
      ...req.body,
      image: req.file ? `/uploads/pets/${req.file.filename}` : null,
    };

    const product = await PetProduct.create(productData);
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating pet product:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getPetProducts = async (req, res) => {
  const products = await PetProduct.find();
  res.json(products);
};

export const getPetProduct = async (req, res) => {
  const product = await PetProduct.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const updatePetProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const updates = {
      ...req.body,
    };

    // If a new image was uploaded
    if (req.file) {
      updates.image = `/uploads/pets/${req.file.filename}`;
    }

    const product = await PetProduct.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const deletePetProduct = async (req, res) => {
  const product = await PetProduct.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
};
