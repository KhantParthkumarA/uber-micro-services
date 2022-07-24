import { mongoose, Schema } from 'mongoose';


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
  product_type: {
    type: String,
    enum: ["SUV", "SEDAN", "HATCHBACK", "LUXUARY"]
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
    enum: ["PENDING", "APPROVE", "REJECT", "BLOCK"]
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
  },
  drive_status: {
    type: String,
    enum: ["AVAILABLE", "WAY_TO_PICKUP", "START_RIDE", "ENROUTE_TO_COMPLETE_RIDE"]
  },
  vehicleDetails: [{
    type: String,
    name: String,
    modelName: String,
    platNo: String,
    color: String,
    handicapAccess: Boolean,
    primary: Boolean
  }],
  pushTokens: [{
    deviceId: String,
    token: String
  }],
})


const OrderSchema = new mongoose.Schema({
  riderId: { type: Schema.Types.ObjectId, ref: 'Rider' },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  requestId: { type: Schema.Types.ObjectId, ref: 'Requests' },
  price: Number,
  waitingCharge: {
    minute: Number,
    freeMinute: Number,
    charge: Number
  },
  paymentMethod: {
    type: String,
    default: "CASH"
  },
  status: {
    type: String,
    enum: ["PICKUP", "STARTRIDE", "CANCLERIDE", "ARRIVING"]
  },
  isCompleted: {
    type: Boolean
  },
  isConfirmByDriver: {
    type: Boolean
  },
  cancleOrder: {
    cancleBy: {
      type: String,
      enum: ['DRIVER', 'RIDER']
    },
    reason: String
  },
  rideStartTime: {
    type: Date
  },
  rideEndTime: {
    type: Date
  },
  driverAtTime: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

const NotificationsSchema = new mongoose.Schema({
  notification: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  type: { type: String, required: true },
  riderId: { type: Schema.Types.ObjectId, ref: 'Rider', index: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver', index: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: 'throw' })

const Product = mongoose.model('Product', ProductSchema);
const Driver = mongoose.model('Driver', DriverSchema);
const Order = mongoose.model('Order', OrderSchema);
const Notifications = mongoose.model("Notifications", NotificationsSchema)


export default { Product, Driver, Order, Notifications };

