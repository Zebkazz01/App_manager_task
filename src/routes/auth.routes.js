import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { regiterSchema, loginSchema } from "../schemas/auth.schema.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/register", validateSchema(regiterSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken);
router.post("/profile", authRequired, upload, profile);

export default router;
