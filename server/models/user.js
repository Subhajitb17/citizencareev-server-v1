const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      default: "+91",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      // select: false,
      // required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    currentLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    previousLocation: [
      {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
    ],
    role: {
      type: String,
      enum: ["USER"],
      default: "USER",
      required: true,
    },
    addresses: [
      {
        _id: { type: Schema.Types.ObjectId },
        name: { type: String, trim: true },
        phoneNo: { type: String, trim: true },
        houseNumber: { type: String, trim: true },
        floor: { type: String, trim: true },
        isLiftAvailable: { type: Boolean },
        deliveryFloor: { type: Number },
        landmark: { type: String, trim: true },
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        pincode: { type: Number },
        latitude: {
          type: String,
          required: true,
        },
        longitude: {
          type: String,
          required: true,
        },
        addressType: {
          type: String,
          default: "Others",
          trim: true,
        },
      },
    ],

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    firebaseToken: [
      {
        type: String,
      },
    ],
    previousPincodes: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
