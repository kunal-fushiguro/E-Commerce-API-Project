import Joi from "joi";
import RefreshToken from "../../models/Token.js";
import CustomErrorHandle from "../../services/customErrorHandle.js";
import { JwtToken } from "../../services/Jwt.js";
import { JWT_REFRESH_TOKEN_SECERT } from "../../../config/index.js";
import User from "../../models/User.js";

const Refresh = {
  async token(req, res, next) {
    const refreshSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const refreshtoken = await RefreshToken.findOne({
        token: req.body.refreshToken,
      });
      if (!refreshtoken) {
        return next(CustomErrorHandle.unAuthorizedError("Invalid Token"));
      }

      const { id } = await JwtToken.verify(
        refreshtoken.token,
        JWT_REFRESH_TOKEN_SECERT
      );
      const user = await User.findById(id).select(
        "-password -createdAt -updatedAt -__v"
      );
      if (!user) {
        return next(CustomErrorHandle.unAuthorizedError("No User Found"));
      }

      const newAccessToken = JwtToken.sign({ id: user._id, role: user.role });
      const newRefreshToken = JwtToken.sign(
        { id: user._id, role: user.role },
        "1y",
        JWT_REFRESH_TOKEN_SECERT
      );

      await RefreshToken.create({ token: newRefreshToken });

      res.json({
        success: true,
        message: "Login Successfully.",
        user,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default Refresh;
