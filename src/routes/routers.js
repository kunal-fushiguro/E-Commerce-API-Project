import express from "express";
import {
  registerController,
  loginController,
  whoami,
  refresh,
  logout,
} from "../controller/index.js";
import auth from "../middlewares/auth/auth.js";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, whoami.me);
router.post("/refresh", refresh.token);
router.post("/logout", auth, logout.logout);

export default router;
