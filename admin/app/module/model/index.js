import { mongoose, Schema } from "mongoose";
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
        basePrice: Number,
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
        enum: ["auto", "premium", "luxuary", "SUV", "SEDAN", "HATCHBACK"]
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
    },
    bank_details: Object,
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
    },
    rideForSomeone: {
        passengerName: String,
        passengerPhoneNumber: Number
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
    pushTokens: [{
        deviceId: String,
        token: String
    }],
    favouriteDriver: Array,
    stripeCustomerId: String,
    liveLocation: Object,
    savedLocation: [
        {
            lat: Number,
            lng: Number
        }
    ]
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
    rider: String,
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

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String },
    phoneNumber: String,
    type: { type: String, enum: ["ADMIN"] },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"] },
    verified: { type: Boolean, enum: [true, false] },
    createdAt: {
        type: Date, default: () => {
            return new Date()
        },
    },
    updatedAt: { type: Date },
}, { strict: 'throw' })

UserSchema.pre('save', async function (next) {
    // if password is not modifies
    if (!this.isModified('password')) {
        return next();
    }
    //encrypt password with the cost 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

UserSchema.methods.correctPassword = async function (password, userPassword) {
    return await bcrypt.compare(password, userPassword);
};

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

const Driver = mongoose.model("Driver", DriverSchema);
const Product = mongoose.model("Product", ProductSchema);
const Subscription = mongoose.model("Subscription", SubscriptionSchema)
const ProductType = mongoose.model("ProductType", productTypeSchema)
const Order = mongoose.model("Order", OrderSchema);
const Rider = mongoose.model("Rider", RiderSchema);
const Requests = mongoose.model("Requests", RequestSchema);
const User = mongoose.model('User', UserSchema);
const Setting = mongoose.model('Setting', SettingSchema);

export default { Product, Subscription, ProductType, Driver, Order, Rider, Requests, User, Setting }