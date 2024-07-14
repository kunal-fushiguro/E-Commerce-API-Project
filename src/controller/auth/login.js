import Joi from "joi";
import User from "../../models/User.js";
import CustomErrorHandle from "../../services/customErrorHandle.js";
import bcrypt from "bcrypt";
import { JwtToken } from "../../services/Jwt.js";

const loginController = {
  async login(req, res, next) {
    // validation
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,40}$"))
        .required(),
    });

    const { err } = loginSchema.validate(req.body);
    if (err) {
      return next(err);
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandle.wrongCredentials());
      }
      //   compare password
      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
        return next(CustomErrorHandle.wrongCredentials());
      }

      //   assign token
      const accessToken = JwtToken.sign({ id: user._id, role: user.role });

      res.json({
        success: true,
        message: "Login Successfully.",
        accessToken,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default loginController;
