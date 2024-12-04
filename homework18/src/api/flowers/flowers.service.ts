import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { flowersModel } from '../../models/flowers';

interface Flower {
  name: string;
  type: string;
  age: number;
  _id?: mongoose.Types.ObjectId;
}

export const getAllFlowers = async (req: Request, res: Response): Promise<void> => {
  try {
    let { page = 1, take = 10 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedTake = Math.min(parseInt(take as string, 10), 10);

    const flowers = await flowersModel
      .find()
      .skip((parsedPage - 1) * parsedTake)
      .limit(parsedTake);

    res.status(200).json({ message: 'Success', data: flowers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flowers' });
  }
};

export const createFlower = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, age } = req.body as Pick<Flower, 'name' | 'type' | 'age'>;

    if (!name || !type || !age) {
      res.status(400).json({ error: 'Fields are required' });
      return;
    }

    const newFlower = await flowersModel.create({ name, type, age });
    res
      .status(201)
      .json({ message: 'Flower created successfully', data: newFlower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create flower' });
  }
};

export const getFlowerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'Invalid MongoDB ID provided' });
      return;
    }

    const flower = await flowersModel.findById(id);

    if (!flower) {
      res.status(404).json({ error: 'Flower not found' });
      return;
    }

    res.status(200).json({ message: 'Success', data: flower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flower' });
  }
};

export const updateFlowerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'Invalid MongoDB ID provided' });
      return;
    }

    const updatedFlower = await flowersModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlower) {
      res.status(404).json({ error: 'Flower not found or not updated' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Flower updated successfully', data: updatedFlower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flower' });
  }
};

export const deleteFlowerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ error: 'Invalid MongoDB ID provided' });
      return;
    }

    const deletedFlower = await flowersModel.findByIdAndDelete(id);

    if (!deletedFlower) {
      res.status(404).json({ error: 'Flower not found or not deleted' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Flower deleted successfully', data: deletedFlower });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flower' });
  }
};