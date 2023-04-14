const { Schema, mongoose } = require("../db");

const orderSchema = new Schema(
  {
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status",
    },
    paymentDate: {
      type: Date,
    },
    shippingDate: {
      type: Date,
    },
    arrivalDate: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [],
    totalPrice: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
