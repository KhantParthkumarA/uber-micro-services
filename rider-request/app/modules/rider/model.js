import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const RiderSchema = mongoose.Schema({
  riderID: String,
  riderFirstName: String,
  riderLastName: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: [true, "User with email already exists"],
  },
  phoneNumber: {
    type: String,
    unique: [true, "User with phone number already exists"],
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  userType: {
    type: String
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
  favouriteDriver: Array
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
  waitingCharge: {
    minute: Number,
    freeMinute: Number,
    charge: Number
  }
})

const Rider = mongoose.model('Rider', RiderSchema);
const Product = mongoose.model('Product', ProductSchema);
const Fair = mongoose.model('Fair', FairSchema);
const Requests = mongoose.model('Requests', RequestSchema);
// export default mongoose.model('Rider', RiderSchema);

module.exports = { Rider, Product, Fair, Requests };
