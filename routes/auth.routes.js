import { Router } from "express";
const router = Router();

router.post("/create-user", (req, res) => {
  res.send("THIS IS COMING FROM CREATE USER");
});

router.post("/login-user", (req, res) => {
  res.send("THIS IS COMING FROM LOGIN USER");
});

export default router;
