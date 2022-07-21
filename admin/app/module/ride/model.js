import { mongoose, Schema } from "mongoose";

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
    status: {
        type: String,
        enum: ['CONFIRMED', 'CANCLE']
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
const Order = mongoose.model("Order", OrderSchema);
const Rider = mongoose.model("Rider", RiderSchema);
const Requests = mongoose.model("Requests", RequestSchema);

module.exports = { Order, Rider, Requests }