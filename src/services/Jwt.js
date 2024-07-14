import { JWT_TOKEN_SECERT } from "../../config/index.js";
import jwt from "jsonwebtoken";

class JwtToken {
  static sign(payload, expiry = "600s", secertkey = JWT_TOKEN_SECERT) {
    return jwt.sign(payload, JWT_TOKEN_SECERT, { expiresIn: expiry });
  }
  static verify(token, secertkey = JWT_TOKEN_SECERT) {
    return jwt.verify(token, JWT_TOKEN_SECERT);
  }
}

export { JwtToken };
