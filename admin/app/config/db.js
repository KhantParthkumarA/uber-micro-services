/* eslint-disable no-console */
import mongoose from 'mongoose';
import models from '../module/model'

const { Driver,
  Order,
  Product,
  ProductType,
  Requests,
  Rider,
  Setting,
  Subscription,
  User
} = models
const db = process.env.MONGO_URI;
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreatendex: true,
}

mongoose.Promise = global.Promise

const connectDB = async () => {
  try {
    console.log('db', db)
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(async result => {
        console.log('DB connected successfully')
        // require("../script")
      })
      .catch(err => console.error('Error while connecting DB', err))    
  } catch (err) {
    console.log(`MongoDB connection failed due to: ${err.message}`);
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

export {
  Driver,
  Order,
  Product,
  ProductType,
  Requests,
  Rider,
  Setting,
  Subscription,
  User
}
