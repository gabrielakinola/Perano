import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
// import User from "./models/user.model.js";
const port = process.env.PORT;
const app = express();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
