import express from "express";
const app = express();
import { readFile, writeFile } from "./utils.js";

app.use(express.json());

const PORT = 3000;

app.get("/expenses", async (req, res) => {
  try {
    let { page = 1, take = 10 } = req.query;
    take > 10 ? (take = 10) : take;
    const expenses = await readFile();

    res.json(expenses.slice((page - 1) * take, take * page));
  } catch (error) {
    res.status(500).json({ error: "Failed to read expenses" });
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const { category, price, importance } = req.body;

    if (!price || !category || !importance) {
      return res.status(400).json({ error: "All fields are required" });
    }

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
    res.status(500).json({ error: "Failed to create a new expense" });
  }
});

app.get("/expenses/:id", async (req, res) => {
  try {
    const expenses = await readFile();
    const expenseId = Number(req.params.id);
    const expense = expenses.find((expense) => expense.id === expenseId);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expense" });
  }
});

app.put("/expenses/:id", async (req, res) => {
  try {
    const expenses = await readFile();
    const expenseId = Number(req.params.id);
    const { category, price } = req.body;

    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ error: "Expense not found" });
    }

    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      price: price ?? expenses[expenseIndex].price,
      category: category ?? expenses[expenseIndex].category,
    };

    await writeFile(JSON.stringify(expenses));
    res.status(200).json({
      message: "Expense updated successfully",
      data: expenses[expenseIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  try {
    const expenses = await readFile();
    const expenseId = Number(req.params.id);
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ error: "API key required" });
    }

    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ error: "Expense not found" });
    }

    expenses.splice(expenseIndex, 1);
    await writeFile(JSON.stringify(expenses));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
