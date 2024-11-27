import { expenseModel } from '../../models/expense.js';
import mongoose from 'mongoose';

export const getAllExpenses = async (req, res) => {
  let { page = 1, take = 10 } = req.query;
  page = parseInt(page, 10);
  take = parseInt(take, 10);

  take = Math.min(take, 10);

  const expenses = await expenseModel
    .find()
    .skip((page - 1) * take)
    .limit(take);

  res.render('pages/expenses.ejs', { expenses });
};

export const createExpense = async (req, res) => {
  const { category, price } = req.body;

  const user = await expenseModel.create({ category, price });

  res.status(200).json({ message: 'success', data: user });
};

export const addExpense = async (req, res) => {
  try {
    res.render('pages/addExpense.ejs');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

export const editExpense = async (req, res) => {
  try {
    res.render('pages/editExpense.ejs');
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

export const expenseDetails = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid expense ID provided' });
  }
  const expense = await expenseModel.findById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.render('pages/expenseDetails.ejs', { expense });
};

export const getExpenseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'Invalid MongoDB ID provided' });
    return;
  }

  const expense = await expenseModel.findById(id);
  if (!expense) {
    res.status(404).res.json({ message: 'not found' });
  }

  res.json(expense);
};

export const updateExpenseById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid MongoDB ID provided' });
  }

  const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedExpense) {
    return res
      .status(404)
      .json({ message: 'Expense not found or not updated' });
  }

  res
    .status(200)
    .json({ message: 'Expense updated successfully', data: updatedExpense });
};

export const deleteExpenseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'Invalid MongoDB ID provided' });
    return;
  }

  const deletedProduct = await expenseModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    res.status(404).json({ message: 'product was not deleted' });
    return;
  }

  res.json(deletedProduct);
};
