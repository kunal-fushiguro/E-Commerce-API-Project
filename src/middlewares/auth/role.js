import User from "../../models/User.js";
import CustomErrorHandle from "../../services/CustomErrorHandle.js";

const role = async (req, res, next) => {
  const userid = req.user.id;
  try {
    const user = await User.findById(userid);
    if (!user) {
      return next(CustomErrorHandle.notFound("User Not Found"));
    }

    if (user.role === "admin") {
      next();
    } else {
      return next(CustomErrorHandle.unAuthorizedError());
    }
  } catch (error) {
    return next(CustomErrorHandle.serverError(error.message));
  }
};

export default role;
