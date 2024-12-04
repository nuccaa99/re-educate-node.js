"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    category: {
        type: String,
        required: true,
    },
    price: Number,
    importance: String,
}, { timestamps: true });
exports.expenseModel = mongoose_1.default.model("expenses", expenseSchema);
