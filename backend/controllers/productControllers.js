import AsyncHandler from "express-async-handler";
import Product from "../models/product.js";

//@description      fetch all products
//@route            GET /api/products/
//@access           public level

// regex is used to match all strings if aonly few characters of it is given
// options: "i" is used for matching case sensitive strings as well
const getProducts = AsyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // to get total products number depending upon keyword that may be empty as well
  const count = await Product.countDocuments({ ...keyword });

  // to get total products as object depending upon keyword
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).send({ products, page, pages: Math.ceil(count / pageSize) });
});

//@description      fetch single products
//@route            GET /api/products/:id
//@access           public level
const getPtoductByID = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send("Error: Prodcut not found");
  }
});

//@description      delete single products
//@route            DELETE /api/products/:id
//@access           private level ?ADMIN
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed!!" });
  } else {
    res.status(404).send("Error: Product not found");
  }
});

//@description      create a product
//@route            post /api/products
//@access           private level / ADMIN
const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.png",
    brand: "Sample Brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@description      update a product
//@route            put /api/products/:id
//@access           private level / ADMIN
const updateProduct = AsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(404);
    throw new Error("Product not Found!!");
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

//@description      create new review
//@route            post /api/products/:id/reviews
//@access           private level
const createProductReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed!! ");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // saving the review created
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    // creating average review
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product not Found!!");
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

export {
  getProducts,
  getPtoductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
