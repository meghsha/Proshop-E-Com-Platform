import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.methods.matchPassword = () => async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    next();
  }
  // Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt); 
});

const User = mongoose.model("User", userSchema);
export default User;
