import mongoose from "mongoose";

interface FlowerDocument {
  name: String;
  type: String;
  age: Number;
}

const flowersSchema = new mongoose.Schema<FlowerDocument>(
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

export const flowersModel = mongoose.model<FlowerDocument>(
  "flowers",
  flowersSchema
);
