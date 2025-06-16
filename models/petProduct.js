import mongoose from "mongoose";

const petProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [1, "Name must not be empty"],
      maxLength: [100, "Name must be under 100 characters"],
    },
    brand: {
      type: String,
      trim: true,
      default: "Generic",
      maxLength: [100, "Brand name too long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock can't be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be an integer",
      },
    },
    description: {
      type: String,
      maxLength: [1000, "Description too long"],
    },
    image: {
      type: String,
      validate: {
        validator: (v) =>
          !v ||
          /^(\/uploads\/pets\/[\w-]+\.(jpg|gif|png|jpeg)$)|(^https?:\/\/.+\.(jpg|gif|png|jpeg)$)/.test(
            v
          ),
        message:
          "Image must be a valid path or URL ending in .jpg, .png, .gif, or .jpeg",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Food",
          "Toys",
          "Accessories",
          "Grooming",
          "Medicine",
          "Training",
          "Bedding",
          "Other",
        ],
        message:
          "Category must be one of: Food, Toys, Accessories, Grooming, Medicine, Training, Bedding, Other",
      },
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PetProduct", petProductSchema);
