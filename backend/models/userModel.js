import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },
    isAdmin: {
      type: Boolean,
      requred: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
