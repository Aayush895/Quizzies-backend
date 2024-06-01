import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    token: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

// Before the document is being added to the mongodb collection, the password will be hashed first and then saved in the collection
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Custom mongoose instance method for checking if the password is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Custom mongoose method for generating a jwt token
userSchema.methods.generateToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SECRET
  );
};

export const User = mongoose.model("User", userSchema);