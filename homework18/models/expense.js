import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    price: Number,
    importance: String,
  },
  { timestamps: true }
);

export const expenseModel = mongoose.model("expenses", expenseSchema);