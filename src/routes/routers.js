import express from "express";
import {
  registerController,
  loginController,
  whoami,
  refresh,
  logout,
  product,
} from "../controller/index.js";
import auth from "../middlewares/auth/auth.js";
import role from "../middlewares/auth/role.js";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, whoami.me);
router.post("/refresh", refresh.token);
router.post("/logout", auth, logout.logout);
router.post("/product", auth, role, product.create);
router.delete("/product", auth, role, product.delete);
router.get("/product", product.allShow);

export default router;
