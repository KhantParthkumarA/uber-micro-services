import { mongoose, Schema } from 'mongoose';
import bcrypt from "bcrypt";

const RiderSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: [true, "Rider with email already exists"],
  },
  phoneNumber: {
    type: String,
    unique: [true, "Rider with phone number already exists"],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  type: {
    type: String,
    enum: ["RIDER"],
    default: "RIDER"
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'INACTIVE',
  },
  permissions: {
    type: Array,
  },
  token: {
    type: String,
  },
  photo: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  verificationCode: {
    type: Number
  },
  verified: {
    type: Boolean
  },
  oAuth: {
    clientId: {
      type: String
    },
    provider: {
      type: String
    }
  },
  otp: {
    type: Number
  },
  favouriteDriver: Array,
  stripeCustomerId: String,
  liveLocation: Object,
});


RiderSchema.pre('save', async function (next) {
  // if password is not modifies
  if (!this.isModified('password')) {
    return next();
  }
  //encrypt password with the cost 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

RiderSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};


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
  }
});


const FairSchema = new mongoose.Schema({
  value: Number,
  display: String,
  currency_code: String,
  trip: {
    distance_unit: String,
    duration_estimate: Number,
    distance_estimate: Number
  },
  pickup_estimate: Number,
  breakdown: Array,
})

const RequestSchema = new mongoose.Schema({
  productID: Number,
  status: String,
  vehicle: Object,
  driver: Object,
  location: Object,
  eta: Number,
  surge_multiplier: Number,
  fair_id: String,
  seat_count: Number,
  waitingCharge: {
    minute: Number,
    freeMinute: Number,
    charge: Number
  }
})

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

const NotificationsSchema = new mongoose.Schema({
  notification: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  type: { type: String, required: true },
  riderId: { type: Schema.Types.ObjectId, ref: 'Rider', required: true, index: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { strict: 'throw' })

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
    enum: ['CONFIRMED', 'CANCLE']
  },
  isCompleted: {
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

OrderSchema.pre('save', function (next) {
  if (this.price) {
    this.price = Math.round(this.price);
  }
  next();
})
OrderSchema.pre('update', function (next) {
  if (this.price) {
    this.price = Math.round(this.price);
  }
  next();
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
  liveLocation: Object,
  drive_status: {
    type: String,
    enum: ["AVAILABLE", "WAY_TO_PICKUP", "START_RIDE", "ENROUTE_TO_COMPLETE_RIDE"]
  }
})

const SettingSchema = new Schema({
  appLink: {
    userPlayStoreLink: String,
    userAppStoreLink: String,
    driverPlayStoreLink: String,
    driverAppStoreLink: String,
  },
  driverRideAcceptTimeout: Number,
  contactNumber: String,
  email: { type: String, validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
  driverSearchRadios: String,
  googleMapKey: String,
  fireBaseKey: String,
  brandDetails: {
    name: String,
    logo: String,
    faviconIcon: String
  },
  surge_detail: {
    price: Number,
    from: Number,
    to: Number
  }
})


const Rider = mongoose.model('Rider', RiderSchema);
const Product = mongoose.model('Product', ProductSchema);
const Fair = mongoose.model('Fair', FairSchema);
const Requests = mongoose.model('Requests', RequestSchema);
const Subscription = mongoose.model("Subscription", SubscriptionSchema)
const Notifications = mongoose.model("Notifications", NotificationsSchema)
const Order = mongoose.model("Order", OrderSchema)
const Driver = mongoose.model("Driver", DriverSchema);
const Setting = mongoose.model('Setting', SettingSchema);

// export default mongoose.model('Rider', RiderSchema);

module.exports = { Rider, Product, Fair, Requests, Subscription, Notifications, Order, Driver, Setting };
