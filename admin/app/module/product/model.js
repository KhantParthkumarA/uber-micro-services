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
    currency_code: String
  },
  productType: {
    type: Schema.Types.ObjectId,
    'ref': 'ProductType'
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
  vehicleDetails: {
    type: String,
    name: String,
    modelName: String,
    platNo: String,
    color: String,
    handicapAccess: Boolean
  }
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

const productTypeSchema = new mongoose.Schema({
  productType: {
    type: String,
    enum: ["auto", "premium", "luxuary"]
  },
  description: String,
  capacity: Number,
  service_fees: {
    type: Array
  },
  cost_per_minute: Number,
  distance_unit: String,
  minimum: Number,
  cost_per_distance: Number,
  basePrice: Number,
  cancellation_fee: Number,
  currency_code: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
})


const Product = mongoose.model("Product", ProductSchema);
const Subscription = mongoose.model("Subscription", SubscriptionSchema)
const ProductType = mongoose.model("ProductType", productTypeSchema)
module.exports = { Product, Subscription, ProductType }