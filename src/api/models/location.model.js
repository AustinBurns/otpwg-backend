import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    longitude: {
      type: mongoose.Decimal128,
      required: true,
    },
    latitude: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

export const Location = mongoose.model('location', locationSchema);
