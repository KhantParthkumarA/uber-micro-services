import { mongoose, Schema } from "mongoose";

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
    currency_code: String,
    company_commission: Number
  },
  product_type: {
    type: String,
    enum: ["SUV", "SEDAN", "HATCHBACK", "LUXUARY"]
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE"]
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


const SubscriptionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  duration: Number,
  durationType: {
    type: String,
    enum: ["MONTH", "YEAR"]
  },
  subscriptionFor: {
    type: String,
    enum: ["DRIVER", "RIDER"]
  },
  plan_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  live_location: {
    lat: String,
    lng: String
  }

})



const Product = mongoose.model("Product", ProductSchema);
const Subscription = mongoose.model("Subscription", SubscriptionSchema)

module.exports = { Product, Subscription }