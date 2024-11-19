import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const ensureIsAuthenticated = async (req, res, next) => {
  let token = null;
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "auth token is required" });
  }
  try {
    // Verify the token
    const userPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // Check if user exists
    const user = await User.findById(userPayload._id).select("-password");
    // if no user found, send error response
    if (!user) {
      return res
        .status(401)
        .json({ message: "unathourized request: invalid user" });
    }
    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { ensureIsAuthenticated };
