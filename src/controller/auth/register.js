import Joi from "joi";
import CustomErrorHandle from "../../services/customErrorHandle.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { JwtToken } from "../../services/Jwt.js";
import { JWT_REFRESH_TOKEN_SECERT } from "../../../config/index.js";
import RefreshToken from "../../models/Token.js";

const registerController = {
  async register(req, res, next) {
    // validate the request
    // authorise the request
    // check if user is in the database already
    // prepare model
    // store in database
    // generate jwt token
    // send response
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,40}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandle.alreadyExist("This Email is Already Taken.")
        );
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const result = await user.save();

      const accessToken = JwtToken.sign({ id: result._id, role: result.role });
      const refreshToken = JwtToken.sign(
        { id: result._id, role: result.role },
        "1y",
        JWT_REFRESH_TOKEN_SECERT
      );

      await RefreshToken.create({ token: refreshToken });

      res.json({
        success: true,
        message: "User Created Successfully.",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return next(error);
    }
  },
};

export default registerController;
