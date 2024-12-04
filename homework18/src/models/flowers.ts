import mongoose from "mongoose";

interface FlowerDocument {
  name: string;
  type: number;
  age: string;
}

const flowersSchema =
  new mongoose.Schema<FlowerDocument>(
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

export const flowersModel =
  mongoose.model < FlowerDocument > ("flowers", flowersSchema);
