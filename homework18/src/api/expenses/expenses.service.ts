import { Request, Response } from "express";
import mongoose from "mongoose";
import { expenseModel } from "../../models/expense";

interface Expense {
  category: string;
  price: number;
  _id?: mongoose.Types.ObjectId;
}

export const getAllExpenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { page = 1, take = 10 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedTake = Math.min(parseInt(take as string, 10), 10);

  const expenses = await expenseModel
    .find()
    .skip((parsedPage - 1) * parsedTake)
    .limit(parsedTake);

  res.render("pages/expenses.ejs", { expenses });
};

export const createExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category, price } = req.body as Pick<Expense, "category" | "price">;

  const expense = await expenseModel.create({ category, price });

  res.status(200).json({ message: "success", data: expense });
};

export const addExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.render("pages/addExpense.ejs");
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

export const editExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.render("pages/editExpense.ejs");
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

export const expenseDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid expense ID provided" });
    return;
  }

  const expense = await expenseModel.findById(id);

  if (!expense) {
    res.status(404).json({ error: "Expense not found" });
    return;
  }

  res.render("pages/expenseDetails.ejs", { expense });
};

export const getExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid MongoDB ID provided" });
    return;
  }

  const expense = await expenseModel.findById(id);

  if (!expense) {
    res.status(404).json({ message: "not found" });
    return;
  }

  res.json(expense);
};

export const updateExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid MongoDB ID provided" });
    return;
  }

  const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedExpense) {
    res.status(404).json({ message: "Expense not found or not updated" });
    return;
  }

  res.status(200).json({
    message: "Expense updated successfully",
    data: updatedExpense,
  });
};

export const deleteExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid MongoDB ID provided" });
    return;
  }

  const deletedProduct = await expenseModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    res.status(404).json({ message: "product was not deleted" });
    return;
  }

  res.json(deletedProduct);
};
