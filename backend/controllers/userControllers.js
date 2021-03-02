import AsyncHandler from "express-async-handler";
import generateToken from "../utils/tokenGenerator.js";
import User from "../models/users.js";

//@description      loging in user
//@route            POST /api/user/login
//@access           public level
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description      Register new user
//@route            GET /api/user/
//@access           public level
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    //400 stands for bad request
    res.status(400);
    throw new Error("User already exist with this Email-id.");
  }

  const user = await User.create({
    name,
    email,
    password,
    image,
  });
  if (user) {
    //201 stands for something created in database
    res.status(201).send({
      id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    //if data enetered is incomplete or incorrect
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@description      Get user profile
//@route            GET /api/user/profile
//@access           private level
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200);
    res.send({
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@description      Update user profile
//@route            PUT /api/user/profile
//@access           private level
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    //password will get automatically get encrypted when chnaged as i used a middleware in module of user
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(201).send({
      id: updatedUser._id,
      image: updatedUser.image,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//***********ADMIN ROUTES *****************//

//@description      delete a user
//@route            delete /api/user/:id
//@access           private level / ADMIN
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(202).json({ message: "User Removed!!" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//@description      delete a user
//@route            delete /api/user/
//@access           private level / ADMIN
const getUser = AsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@description      get users profile by ID to give it to ADMIN
//@route            PUT /api/user/:id
//@access           private level / ADMIN
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found!! ");
  }
});

//@description      Update user profile by admin
//@route            PUT /api/user/:id
//@access           private level / ADMIN
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    //password will get automatically get encrypted when chnaged as i used a middleware in module of user

    const updatedUser = await user.save();
    res.send({
      id: updatedUser._id,
      image: updatedUser.image,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
};
