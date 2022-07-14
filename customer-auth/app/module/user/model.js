import mongoose from "mongoose";
import { date } from "joi";
import bcrypt from "bcrypt";
import { compare } from "bcryptjs";
import Jwt from "jsonwebtoken";
// import { USERTYPE } from "../../utils/constant";

//Here you define your model
const UserSchema = mongoose.Schema({
  userID: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
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
  username: {
    type: String,
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
    type: String,
    // enum: Object.keys(USERTYPE),
  },
  permissions: {
    type: Array,
  },
  status: {
    type: String,
    // enum: Object.keys(ACCOUNT_STATUS),
    // default: ACCOUNT_STATUS.UNVERIFIED,
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
  }



});


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

export default mongoose.model("User", UserSchema);
