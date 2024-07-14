import { JWT_TOKEN_SECERT } from "../../config/index.js";
import jwt from "jsonwebtoken";

class JwtToken {
  static sign(payload, expiry = "60s", secertkey = JWT_TOKEN_SECERT) {
    return jwt.sign(payload, JWT_TOKEN_SECERT, { expiresIn: expiry });
  }
}

export { JwtToken };
