"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const isValid = (req, res, next) => {
    const apiKey = req.headers["api-key"];
    if (!apiKey || apiKey !== "99999") {
        res.status(401).json({ error: "API key not correct" });
    }
    next();
};
exports.isValid = isValid;
