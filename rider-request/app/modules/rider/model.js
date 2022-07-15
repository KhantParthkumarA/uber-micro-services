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
  }
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

export default mongoose.model('Rider', RiderSchema);
