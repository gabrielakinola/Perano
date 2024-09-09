import { Router } from "express";
import { createUser, verifyEmail } from "../controllers/auth.controllers.js";
const router = Router();

router.post("/create-user", createUser);

router.post("/verify-email", verifyEmail);

export default router;
