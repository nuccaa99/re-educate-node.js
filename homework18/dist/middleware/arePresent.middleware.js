"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arePresent = void 0;
const arePresent = (req, res, next) => {
    const { category, price, importance } = req.body;
    if (!price || !category || !importance) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    next();
};
exports.arePresent = arePresent;
