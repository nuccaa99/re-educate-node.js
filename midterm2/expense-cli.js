#! /usr/bin/env node

import { Command } from "commander";
import { readFile, writeFile } from "./utils.js";
const program = new Command();

program
  .command("create")
  .description("create expense")
  .argument("<category>", "category of the expense")
  .argument("<price>", "price of the expense")
  .argument("<importance>", "importance of the expense")
  .action(async (category, price, importance) => {
    const expenses = await readFile("expenses.json", false);
    if (price < 10) {
      console.log("amount of the expense should be more than 10");
      return;
    }
    const lastId = expenses[expenses.length - 1]?.id || 0;
    const date = new Date();
    const newExpense = {
      id: lastId + 1,
      category,
      price,
      importance,
      date,
    };
    expenses.push(newExpense);
    await writeFile("expenses.json", JSON.stringify(expenses));
  });

program
  .command("show")
  .description("show all expenses")
  .option("--asc", "sort expenses in the ascending order")
  .option("--desc", "sort expenses in the descending order")
  .action(async (options) => {
    const expenses = await readFile("expenses.json", false);
    expenses.forEach((expense) => {
      expense.date = new Date(expense.date);
    });

    if (options.asc) {
      expenses.sort((a, b) => a.date.getTime() - b.date.getTime());
    } else if (options.desc) {
      expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    console.log(expenses);
  });

program
  .command("update")
  .description("update expense")
  .argument("<id>", "id of the expense")
  .argument("<category>", "category of the expense")
  .argument("<price>", "price of the expense")
  .argument("<importance>", "importance of the expense")
  .action(async (id, category, price, importance) => {
    const expenses = await readFile("expenses.json", false);
    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      console.log("expense with that id does not exist");
      return;
    }
    const newExpense = {
      ...expenses[index],
      category,
      price,
      importance,
    };
    expenses[index] = newExpense;
    await writeFile("expenses.json", JSON.stringify(expenses));
  });

program
  .command("delete")
  .description("delete expense")
  .argument("<id>", "id of the expense")
  .action(async (id) => {
    const expenses = await readFile("expenses.json", false);
    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      console.log("expense with that id does not exist");
      return;
    }
    expenses.splice(index, 1);
    await writeFile("expenses.json", JSON.stringify(expenses));
  });

program
  .command("get")
  .description("get expense")
  .argument("<id>", "id of expense")
  .action(async (id) => {
    const expenses = await readFile("expenses.json", false);
    const index = expenses.findIndex((expense) => expense.id === Number(id));
    if (index === -1) {
      console.log("expense with that id does not exist");
      return;
    }
    console.log(expenses[index]);
  });

program
  .command("priceSort")
  .description("show all expenses sorted with price")
  .option("--asc", "sort expenses in the ascending order")
  .option("--desc", "sort expenses in the descending order")
  .action(async (options) => {
    const expenses = await readFile("expenses.json", false);
    if (options.asc) {
      expenses.sort((a, b) => a.price - b.price);
    } else if (options.desc) {
      expenses.sort((a, b) => b.price - a.price);
    }
    console.log(expenses);
  });

program.parse();
