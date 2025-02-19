import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDb connected on ${conn.connection.host}`);
  } catch (error) {
    console.log('Error connecting to MONGODB0', error.message);
    process.exit(1);
  }
};
