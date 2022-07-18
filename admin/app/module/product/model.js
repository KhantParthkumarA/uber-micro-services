import mongoose from "mongoose";
import bcrypt from "bcrypt";


//Here you define your model
const ProductSchema = mongoose.Schema({
  productID: {
    type: String,
  },
  capacity: Number,
  upfront_fare_enabled: Boolean,
  priceDetails: {
    service_fees: {
      type: Array
    },
    cost_per_minute: Number,
    distance_unit: String,
    minimum: Number,
    cost_per_distance: Number,
    base: Number,
    cancellation_fee: Number,
    currency_code: String
  },
  image: String,
  cash_enabled: Boolean,
  shared: Boolean,
  Short_description: String,
  display_name: String,
  product_group: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Product", ProductSchema);
