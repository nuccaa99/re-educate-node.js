"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpenseById = exports.updateExpenseById = exports.getExpenseById = exports.expenseDetails = exports.editExpense = exports.addExpense = exports.createExpense = exports.getAllExpenses = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const expense_1 = require("../../models/expense");
const getAllExpenses = async (req, res) => {
    let { page = 1, take = 10 } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedTake = Math.min(parseInt(take, 10), 10);
    const expenses = await expense_1.expenseModel
        .find()
        .skip((parsedPage - 1) * parsedTake)
        .limit(parsedTake);
    res.render("pages/expenses.ejs", { expenses });
};
exports.getAllExpenses = getAllExpenses;
const createExpense = async (req, res) => {
    const { category, price } = req.body;
    const expense = await expense_1.expenseModel.create({ category, price });
    res.status(200).json({ message: "success", data: expense });
};
exports.createExpense = createExpense;
const addExpense = async (req, res) => {
    try {
        res.render("pages/addExpense.ejs");
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create expense" });
    }
};
exports.addExpense = addExpense;
const editExpense = async (req, res) => {
    try {
        res.render("pages/editExpense.ejs");
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create expense" });
    }
};
exports.editExpense = editExpense;
const expenseDetails = async (req, res) => {
    const { id } = req.params;
    if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid expense ID provided" });
        return;
    }
    const expense = await expense_1.expenseModel.findById(id);
    if (!expense) {
        res.status(404).json({ error: "Expense not found" });
        return;
    }
    res.render("pages/expenseDetails.ejs", { expense });
};
exports.expenseDetails = expenseDetails;
const getExpenseById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(400).json({ message: "Invalid MongoDB ID provided" });
        return;
    }
    const expense = await expense_1.expenseModel.findById(id);
    if (!expense) {
        res.status(404).json({ message: "not found" });
        return;
    }
    res.json(expense);
};
exports.getExpenseById = getExpenseById;
const updateExpenseById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(400).json({ message: "Invalid MongoDB ID provided" });
        return;
    }
    const updatedExpense = await expense_1.expenseModel.findByIdAndUpdate(id, req.body, {
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
exports.updateExpenseById = updateExpenseById;
const deleteExpenseById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(400).json({ message: "Invalid MongoDB ID provided" });
        return;
    }
    const deletedProduct = await expense_1.expenseModel.findByIdAndDelete(id);
    if (!deletedProduct) {
        res.status(404).json({ message: "product was not deleted" });
        return;
    }
    res.json(deletedProduct);
};
exports.deleteExpenseById = deleteExpenseById;
