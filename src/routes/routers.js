import express from "express";
import {
  registerController,
  loginController,
  whoami,
  refresh,
} from "../controller/index.js";
import auth from "../middlewares/auth/auth.js";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, whoami.me);
router.post("/refresh", refresh.token);

export default router;
