import { DEBUG_MODE } from "../../../config/index.js";
import pkg from "joi";
import CustomErrorHandle from "../../services/customErrorHandle.js";

const ErrorHandler = (err, req, res, next) => {
  const { ValidationError } = pkg;
  let statusCode = 500;
  let data = {
    message: "Internal server error!!",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandle) {
    statusCode = err.status;
    data = {
      message: err.msg,
    };
  }

  return res.status(statusCode).json(data);
};

export default ErrorHandler;
