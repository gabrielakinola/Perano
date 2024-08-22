import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import User from "./models/user.model.js";
// import User from "./models/user.model.js";
const port = process.env.PORT;
const app = express();
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

// app.post("/create-user", (req, res)=>{
//   const {name, age, email}= req.body

// })
// Working with url params
// app.put("/get-user/:userId", (req, res) => {
//   const { userId } = req.params;

//   const updatedUser = await User.findByIdAndUpdate(userId,{
//     fullName:
//   })
// });

app.get("/get-users", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({ allUsers });
});

app.put("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { fullName } = req.body;

  // Use the id from the params to update the user
  const updatedUser = await User.findByIdAndUpdate(userId, {
    fullName: fullName,
  });
  res.status(200).json({ message: "user updated" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
