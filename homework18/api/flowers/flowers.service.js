import { flowersModel } from '../../models/flowers.js';
import mongoose from 'mongoose';

export const getAllFlowers = async (req, res) => {
  try {
    let { page = 1, take = 10 } = req.query;
    page = parseInt(page, 10);
    take = Math.min(parseInt(take, 10), 10);

    const flowers = await flowersModel
      .find()
      .skip((page - 1) * take)
      .limit(take);

    res.status(200).json({ message: 'Success', data: flowers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flowers' });
  }
};

export const createFlower = async (req, res) => {
  try {
    const { name, type, age } = req.body;

    if (!name || !type || !age) {
      return res.status(400).json({ error: 'Fields are required' });
    }

    const newFlower = await flowersModel.create({ name, type, age });
    res
      .status(201)
      .json({ message: 'Flower created successfully', data: newFlower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create flower' });
  }
};

export const getFlowerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid MongoDB ID provided' });
    }

    const flower = await flowersModel.findById(id);

    if (!flower) {
      return res.status(404).json({ error: 'Flower not found' });
    }

    res.status(200).json({ message: 'Success', data: flower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flower' });
  }
};

export const updateFlowerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid MongoDB ID provided' });
    }

    const updatedFlower = await flowersModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlower) {
      return res.status(404).json({ error: 'Flower not found or not updated' });
    }

    res
      .status(200)
      .json({ message: 'Flower updated successfully', data: updatedFlower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flower' });
  }
};

export const deleteFlowerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid MongoDB ID provided' });
    }

    const deletedFlower = await flowersModel.findByIdAndDelete(id);

    if (!deletedFlower) {
      return res.status(404).json({ error: 'Flower not found or not deleted' });
    }

    res
      .status(200)
      .json({ message: 'Flower deleted successfully', data: deletedFlower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flower' });
  }
};
