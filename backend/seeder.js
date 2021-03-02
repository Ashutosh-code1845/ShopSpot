import mongoose from "mongoose";
import color from "colors";
import Order from "./models/order.js";
import User from "./models/users.js";
import Product from "./models/product.js";
//for using DB url
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    process.exit();
  } catch (error) {
    console.error(`Error while seeding ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`Error while seeding ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
