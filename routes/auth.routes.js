import { Router } from "express";
import { createUser } from "../controllers/auth.controllers.js";
const router = Router();

router.post("/create-user", createUser);

export default router;
