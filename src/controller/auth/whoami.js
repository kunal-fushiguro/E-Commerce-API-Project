import User from "../../models/User.js";
import CustomErrorHandle from "../../services/customErrorHandle.js";

const whoami = {
  async me(req, res, next) {
    try {
      //   console.log(req);
      const id = req.user.id;
      //   console.log(id);
      const user = await User.findOne({ _id: id }).select(
        "-password -createdAt -updatedAt -__v"
      );
      if (!user) {
        return next(CustomErrorHandle.notFound());
      }
      return res.json({
        success: true,
        message: "Request Successfully",
        user,
      });
    } catch (error) {
      console.log(error.message);
      return next(error);
    }
  },
};

export default whoami;
