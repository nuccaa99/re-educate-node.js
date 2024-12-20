"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlowerById = exports.updateFlowerById = exports.getFlowerById = exports.createFlower = exports.getAllFlowers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const flowers_1 = require("../../models/flowers");
const getAllFlowers = async (req, res) => {
    try {
        let { page = 1, take = 10 } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedTake = Math.min(parseInt(take, 10), 10);
        const flowers = await flowers_1.flowersModel
            .find()
            .skip((parsedPage - 1) * parsedTake)
            .limit(parsedTake);
        res.status(200).json({ message: "Success", data: flowers });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch flowers" });
    }
};
exports.getAllFlowers = getAllFlowers;
const createFlower = async (req, res) => {
    try {
        const { name, type, age } = req.body;
        if (!name || !type || !age) {
            res.status(400).json({ error: "Fields are required" });
            return;
        }
        const newFlower = await flowers_1.flowersModel.create({ name, type, age });
        res
            .status(201)
            .json({ message: "Flower created successfully", data: newFlower });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create flower" });
    }
};
exports.createFlower = createFlower;
const getFlowerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ error: "Invalid MongoDB ID provided" });
            return;
        }
        const flower = await flowers_1.flowersModel.findById(id);
        if (!flower) {
            res.status(404).json({ error: "Flower not found" });
            return;
        }
        res.status(200).json({ message: "Success", data: flower });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch flower" });
    }
};
exports.getFlowerById = getFlowerById;
const updateFlowerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ error: "Invalid MongoDB ID provided" });
            return;
        }
        const updatedFlower = await flowers_1.flowersModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedFlower) {
            res.status(404).json({ error: "Flower not found or not updated" });
            return;
        }
        res
            .status(200)
            .json({ message: "Flower updated successfully", data: updatedFlower });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update flower" });
    }
};
exports.updateFlowerById = updateFlowerById;
const deleteFlowerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ error: "Invalid MongoDB ID provided" });
            return;
        }
        const deletedFlower = await flowers_1.flowersModel.findByIdAndDelete(id);
        if (!deletedFlower) {
            res.status(404).json({ error: "Flower not found or not deleted" });
            return;
        }
        res
            .status(200)
            .json({ message: "Flower deleted successfully", data: deletedFlower });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete flower" });
    }
};
exports.deleteFlowerById = deleteFlowerById;
