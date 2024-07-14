import express from "express";
import { registerController } from "../controller/index.js";

const router = express.Router();

router.post("/register", registerController.register);
export default router;
