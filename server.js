import express from "express";
import { APP_PORT } from "./config/index.js";
import router from "./src/routes/routers.js";
import ErrorHandler from "./src/middlewares/Errorhandler/error.js";
import DB_Connect from "./config/dbconnect.js";

const app = express();

app.use(express.json());
app.use("/api", router);

const serverStarted = async () => {
  await DB_Connect();

  app.use(ErrorHandler);
  app.listen(APP_PORT, () => {
    console.log(`Server Started on PORT : ${APP_PORT}`);
    console.log(`Localhost : http://localhost:${APP_PORT}`);
  });
};

serverStarted();
