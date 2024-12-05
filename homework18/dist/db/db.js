"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectionToDb = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URL);
        console.log('connected to DB');
    }
    catch (e) {
        console.error('cannot connect to DB');
    }
};
exports.connectionToDb = connectionToDb;
