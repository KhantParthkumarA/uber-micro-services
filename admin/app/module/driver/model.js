import { mongoose, Schema } from "mongoose";

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
    bank_details: Object
})


const Driver = mongoose.model("Driver", DriverSchema);

module.exports = { Driver }