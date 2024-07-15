import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
    },
  },
  { timestamps: false }
);

const RefreshToken = mongoose.model(
  "RefreshToken",
  TokenSchema,
  "refreshtoken"
);

export default RefreshToken;
