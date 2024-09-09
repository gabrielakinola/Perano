import User from "../models/user.model.js";
import { sendVerificationEmail } from "../helpers/nodemailer.js";
import bcrypt from "bcryptjs";
import { generateVerifyToken } from "../helpers/token.js";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.model.js";

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, gender } = req.body;
    //   Check if password = comnfirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }
    // Check if user email exists

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user email exist already" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Proceed to save user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
    });

    if (newUser) {
      // Send verication Email
      await sendVerificationEmail(newUser);

      //Generate and Send Verification Token as response to client
      const userPayload = {
        _id: newUser._id,
        email: newUser.email,
      };
      const verificationToken = generateVerifyToken(userPayload);

      res
        .status(200)
        .json({ message: "verification email sent", verificationToken });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Thia controller takes the otp from client confirms it and updates the isEmailVerified prop of user
const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
  // Extract token from req header
  let token = null;
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "auth token is required" });
  }
  // Verify the token
  try {
    const payload = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
    console.log(payload);

    const userOtp = await Otp.findOne({
      user: payload._id,
      otpType: "email-verify",
    });

    if (!userOtp) {
      return res.status(400).json({ message: "otp is invalid" });
    }
    if (userOtp.expiresIn < new Date(Date.now())) {
      return res.status(400).json({ message: "otp has expired" });
    }
    if (userOtp.otp === otp) {
      await User.findByIdAndUpdate(payload._id, { isEmailVerified: true });
      res.status(200).json({ message: "user email verified" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createUser, verifyEmail };
