const { Schema, mongoose } = require("../db");

const productSchema = new Schema(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      require: true,
    },
    model: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    image: [
      {
        type: String,
        require: true,
      },
    ],
    highlight: {
      type: Boolean,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    subtitle: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    detail: {
      type: Object,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: "Order",
    }],
    /*     brands: {
          type: Schema.Types.ObjectId,
          ref: "Brands",
        }, */
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
