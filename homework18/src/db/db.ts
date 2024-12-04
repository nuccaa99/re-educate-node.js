import mongoose from 'mongoose';
import 'dotenv/config';

export const connectionToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('connected to DB');
  } catch (e) {
    console.error('cannot connect to DB');
  }
};