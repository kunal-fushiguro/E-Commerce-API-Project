import express from "express";
import { APP_PORT } from "./config/index.js";

const app = express();

app.listen(APP_PORT, () => {
  console.log(`Server Started on PORT : ${APP_PORT}`);
  console.log(`http://localhost:${APP_PORT}`);
});
