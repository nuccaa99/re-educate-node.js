import mongoose from "mongoose";

const flowersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: String,
    age: Number,
  },
  { timestamps: true }
);

export const flowersModel = mongoose.model("flowers", flowersSchema);
