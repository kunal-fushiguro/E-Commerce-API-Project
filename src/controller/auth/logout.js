import Joi from "joi";
import RefreshToken from "../../models/Token.js";

const Logout = {
  async logout(req, res, next) {
    const refreshSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const response = await RefreshToken.deleteOne({
        token: req.body.refreshToken,
      });

      res.json({
        success: true,
        message: "logout Successfully.",
      });
    } catch (err) {
      return next(new Error("Something went wrong in the database"));
    }
  },
};

export default Logout;
