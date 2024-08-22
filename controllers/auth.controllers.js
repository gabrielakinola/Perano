import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  console.log(req.body);
  // const { fullName, email, password, confirmPassword, gender } = req.body;

  // //   Check if password = comnfirmPassword
  // if (password !== confirmPassword) {
  //   return res.status(400).json({ message: "passwords do not match" });
  // }
  // // Check if user email exists
  // const userExists = await User.findOne({ email: email });

  // if (userExists) {
  //   return res.status(400).json({ message: "user email exist already" });
  // }
  // //   Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // console.log(hashedPassword);

  //  Proceed to save user
};

export { createUser };
