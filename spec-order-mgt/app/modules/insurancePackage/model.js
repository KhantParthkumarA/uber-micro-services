import mongoose from 'mongoose';

// const { Schema } = mongoose;


const InsurancePackageSchema = mongoose.Schema({
  insurancePackageID: {
    type: String,
  },

  organizationID: {
    type: String,
  },

  name: String,

  insuranceType: {
    type: String,
  },

  description: {
    type: String,
  },

  insuranceValue: Number,
  
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'INACTIVE',
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
});
  

export default mongoose.model('insurancePackage', InsurancePackageSchema);
