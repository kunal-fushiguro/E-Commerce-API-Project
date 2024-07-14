import express from "express";
import {
  registerController,
  loginController,
  whoami,
} from "../controller/index.js";
import auth from "../middlewares/auth/auth.js";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, whoami.me);

export default router;
