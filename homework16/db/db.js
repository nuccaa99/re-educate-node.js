import mongoose from 'mongoose';
import 'dotenv/config';

export const connectionToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log('connected to DB');
  } catch (e) {
    console.log('cannot connect to DB');
  }
};
