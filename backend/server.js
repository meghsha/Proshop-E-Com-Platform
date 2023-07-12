import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT;
const app = express();

connectDB(); //Connecting to MongoDB

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
