import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new ApiError(
      409,
      "Please make sure that the entered password is correct!"
    );
  }

  const isExsistingUser = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (isExsistingUser) {
    throw new ApiError(409, "User with same name or email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password -token");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong when registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User was registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist. Please register to login");
  }

  const isPassCorrect = await user.isPasswordCorrect(password);
  if (!isPassCorrect) {
    throw new ApiError(
      401,
      "Invalid user credentials. Please make sure that the password is correct"
    );
  }

  const token = await user.generateToken();
  user.token = token;

  await user.save({
    validateBeforeSave: false,
  });

  const loggedInUser = await User.findById(user._id).select("-password -token");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        token
      },
      "User logged in successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        token: 1,
      },
    },
    {
      $new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User has been logged out"));
});

export { registerUser, loginUser, logoutUser };
