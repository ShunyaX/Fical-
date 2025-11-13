import mongoose from 'mongoose';

let isConnected = false;

export default async function connect() {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MongoDB_URI!);
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    const err = error as Error;
    console.error(`MongoDB connection error: ${err.message}`);
    throw new Error('Failed to connect to MongoDB');
  }
}
