const { Schema, mongoose } = require("../db");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    stname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    streetAddress: {
      type: String,
      require: true,
    },
    reference: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },

    products: { type: Array, require: true },

    details: [{}],

    totalPrice: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", orderSchema);
module.exports = Bill;
