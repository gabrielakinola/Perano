import jwt from "jsonwebtoken";

const generateVerifyToken = (userPayload) => {
  const token = jwt.sign(userPayload, process.env.JWT_VERIFY_SECRET, {
    expiresIn: "5m",
  });
  return token;
};

export { generateVerifyToken };
