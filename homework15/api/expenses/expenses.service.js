import { readFile, writeFile } from '../../utils.js';

export const createExpense = async (req, res) => {
  try {
    const { category, price, importance } = req.body;
    const expenses = await readFile();
    const date = new Date();
    const lastId = expenses[expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      category,
      price,
      importance,
      date,
    };

    expenses.push(newExpense);

    await writeFile(JSON.stringify(expenses));
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;
    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      res.status(400).json({ error: 'Expense with that id not found' });
    }

    res.json(expenses[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find expense' });
  }
};

export const updateExpenseById = async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;
    const { category, price, importance } = req.body;

    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      res.status(400).json({ error: 'Expense not found' });
    }

    expenses[index] = {
      ...expenses[index],
      price: price || expenses[index].price,
      category: category || expenses[index].category,
      importance: importance || expenses[index].importance,
    };
    await writeFile(JSON.stringify(expenses));

    res
      .status(201)
      .json({ message: 'Expense updated successfully', data: expenses[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to find expense' });
  }
};

export const deleteExpenseById = async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;

    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      return res.status(400).json({ error: 'Expense not found' });
    }

    const deletedExpense = expenses.splice(index, 1);

    await writeFile(JSON.stringify(expenses));
    res.status(201).json(deletedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to find expense' });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    let { page = 1, take = 10 } = req.query;
    take > 10 ? (take = 10) : take;
    const expenses = await readFile();
    res.json(expenses.slice((page - 1) * take, take * page));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read' });
  }
};
