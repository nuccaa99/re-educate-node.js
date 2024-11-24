import { readFile, writeFile } from '../../utils.js';

export const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, take = 10 } = req.query;
    const limit = Math.min(take, 10);
    const expenses = await readFile();

    res.render('pages/expenses.ejs', { expenses });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read expenses' });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { category, price } = req.body;
    const expenses = await readFile();
    const lastId = expenses[expenses.length - 1]?.id || 0;

    const newExpense = {
      id: lastId + 1,
      category,
      price,
      date: new Date(),
    };

    expenses.push(newExpense);
    await writeFile(JSON.stringify(expenses));

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

export const addExpense = async (req, res) => {
  try {
    res.render('pages/addExpense.ejs');
  } catch (error) {
    res.status(500).json({ error: 'Failed to render add expense page' });
  }
};

export const editExpense = async (req, res) => {
  try {
    res.render('pages/editExpense.ejs');
  } catch (error) {
    res.status(500).json({ error: 'Failed to render edit expense page' });
  }
};

export const expenseDetails = async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;
    const expense = expenses.find((expense) => expense.id === Number(id));

    if (!expense) {
      return res.status(400).json({ error: 'Expense not found' });
    }

    res.render('pages/expenseDetails.ejs', { expense });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expense details' });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;
    const expense = expenses.find((expense) => expense.id === Number(id));

    if (!expense) {
      return res.status(400).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find expense' });
  }
};

export const updateExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, price } = req.body;
    const expenses = await readFile();

    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      return res.status(400).json({ error: 'Expense not found' });
    }

    const updatedExpense = {
      ...expenses[index],
      category: category || expenses[index].category,
      price: price || expenses[index].price,
    };

    expenses[index] = updatedExpense;
    await writeFile(JSON.stringify(expenses));

    res
      .status(200)
      .json({ message: 'Expense updated successfully', data: updatedExpense });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

export const deleteExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await readFile();

    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      return res.status(400).json({ error: 'Expense not found' });
    }

    const [deletedExpense] = expenses.splice(index, 1);
    await writeFile(JSON.stringify(expenses));

    res
      .status(200)
      .json({ message: 'Expense deleted successfully', data: deletedExpense });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
