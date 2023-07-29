import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const port = process.env.PORT;
const app = express();

connectDB(); //Connecting to MongoDB

// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
