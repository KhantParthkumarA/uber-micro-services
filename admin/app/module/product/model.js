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
  }

})

const DriverSchema = new mongoose.Schema({
  "firstName": String,
  "lastName": String,
  "email": String,
  "phoneNumber": Number,
  "picture": String,
  "rating": Number,
  "DOB": Date,
  "status": {
    type: String,
    enum: ["ACTIVE", "INACTIVE"]
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  role: {
    type: String,
    default: "DRIVER"
  },
  city: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

const Product = mongoose.model("Product", ProductSchema);
const Subscription = mongoose.model("Subscription", SubscriptionSchema)
const Driver = mongoose.model("Driver", DriverSchema);

module.exports = { Product, Subscription, Driver }