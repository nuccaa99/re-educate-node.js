import mongoose from "mongoose";

interface ExpenseDocument {
  category: string;
  price: number;
  importance: string;
}

const expenseSchema = new mongoose.Schema<ExpenseDocument>(
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

export const expenseModel = mongoose.model<ExpenseDocument>(
  "expenses",
  expenseSchema
);
