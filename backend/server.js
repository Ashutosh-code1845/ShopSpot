import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import color from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from "morgan";
import path from "path";
import { errorHandler, NotFound } from "./middleware/errorMiddleware.js";
import { execArgv } from "process";

dotenv.config();
const PORT = process.env.PORT || 5000;

//trigerring DB to get active
connectDB();

const app = express();

// to implement morgan an get status code and route hitten

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//to get json object from user through form
app.use(express.json());

//mounting Paypal API
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//mounting product routes
app.use("/api/products", productRoutes);
//mounting user routes
app.use("/api/user", userRoutes);
//mounting order routes
app.use("/api/order", orderRoutes);
// mounting upload routes
app.use("/api/upload", uploadRoutes);
// mounting dp upload route
app.use("/api/profile/upload", uploadRoutes);
// since we not want our upload folder to be accessible, we need it to be just
// visible to users
// dirname i have used because __dirname is not provided in ES6 and hence we create
// it (First Line)
const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/upload")));

// static profilepicture folder
app.use(
  "/profile/upload",
  express.static(path.join(__dirname, "/upload/profilePicture"))
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API IS ONLINE NOW....");
  });
}

//not found middleware trigger
app.use(NotFound);
// error middleware trigger
app.use(errorHandler);

//server listening
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}....`.yellow
      .bold
  );
});
