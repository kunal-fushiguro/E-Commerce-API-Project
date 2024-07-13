import express from "express";
import { APP_PORT } from "./config/index.js";

const app = express();

app.listen(APP_PORT, () => {
  console.log(`\n\tServer Started on PORT : ${APP_PORT}`);
  console.log(`\tLocalhost : http://localhost:${APP_PORT}`);
});
