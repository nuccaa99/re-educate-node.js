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
    const { id } = req.params;
    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      res.status(400).json({ error: "Expense with that id not found" });
    }
    res.json(expenses[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to find expense with that id" });
  }
});

app.put("/expenses/:id", async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;
    const { category, price } = req.body;

    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      res.status(400).json({ error: "Expense with that id not found" });
    }

    expenses[index] = {
      ...expenses[index],
      price: price || expenses[index].price,
      category: category || expenses[index].category,
    };
    await writeFile(JSON.stringify(expenses));

    res
      .status(201)
      .json({ message: "Expense updated successfully", data: expenses[index] });
  } catch (error) {
    res.status(500).json({ error: "Failed to find expense with that ids" });
  }
});

app.delete("/expenses/:id", async (req, res) => {
  try {
    const expenses = await readFile();
    const { id } = req.params;
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return res.status(401).json({ error: "API key not found" });
    }
    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      return res.status(400).json({ error: "Expense with that id not found" });
    }

    const deletedExpense = expenses.splice(index, 1);

    await writeFile(JSON.stringify(expenses));
    res.status(201).json(deletedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to find expense" });
  }
});


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
