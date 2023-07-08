import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      requred: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, requred: true },
        qty: { type: Number, requred: true },
        image: { type: String, requred: true },
        price: { type: Number, requred: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          requred: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, requred: true },
      city: { type: String, requred: true },
      postalCode: { type: String, requred: true },
      country: { type: String, requred: true },
    },
    paymentMethod: {
      type: String,
      requred: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      requred: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      requred: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      requred: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      requred: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      requred: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      requred: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
