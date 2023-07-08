import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requred: true,
      ref: "User",
    },
    name: {
      type: String,
      requred: true,
    },
    rating: {
      type: Number,
      requred: true,
    },
    comment: {
      type: String,
      requred: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requred: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      requred: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      requred: true,
    },
    description: {
      type: String,
      requred: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      requred: true,
      default: 0,
    },
    price: {
      type: Number,
      requred: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      requred: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      requred: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
