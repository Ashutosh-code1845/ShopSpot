import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { genSalt } = bcrypt;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
      default: "/images/default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

//for decrypting password and compairing
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//pre means before interacting with schema
//save stands for before this event

userSchema.pre("save", async function (next) {
  //this will run when we will update user info except password
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
