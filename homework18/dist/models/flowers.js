"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowersModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const flowersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    type: String,
    age: Number,
}, { timestamps: true });
exports.flowersModel = mongoose_1.default.model("flowers", flowersSchema);
