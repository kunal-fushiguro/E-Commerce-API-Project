import CustomErrorHandle from "../../services/CustomErrorHandle.js";
import { JwtToken } from "../../services/Jwt.js";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  //   console.log(authHeader);
  if (!authHeader) {
    return next(CustomErrorHandle.unAuthorizedError());
  }
  const token = authHeader.split(" ")[1];
  try {
    const { id, role } = await JwtToken.verify(token);
    // console.log(id);
    req.user = {};
    req.user.id = id;
    req.user.role = role;
    next();
  } catch (error) {
    return next(CustomErrorHandle.unAuthorizedError());
  }
};

export default auth;
