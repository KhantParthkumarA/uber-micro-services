/* eslint-disable no-console */
import mongoose  from 'mongoose';

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    console.log('MongoDB Connected....');
    
  } catch (err) {
    console.log(`MongoDB connection failed due to: ${err.message}`);
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
