import { mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
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


const User = mongoose.model('User', UserSchema);
const Setting = mongoose.model('Setting', SettingSchema);
module.exports = { User, Setting }