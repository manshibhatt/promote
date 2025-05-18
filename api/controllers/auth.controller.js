import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return next(createError(409, "An account with this email already exists."));
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    console.log(err);
    next(createError(500, "Something went wrong!"));
  }
};
 
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
    
    if (!user) return next(createError(404, "User not found!"));
    
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or email!"));
    
    const token = jwt.sign(
      {
        id: user?._id,
      },
      process.env.JWT_KEY,
      { expiresIn: age }
    );
    
    const { password, ...info } = user._doc;
    
    // Modified cookie settings to properly work in cross-origin deployments
    res
      .cookie("accessToken", token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true,
        maxAge: age,
        path: '/' 
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};