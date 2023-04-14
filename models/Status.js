const { Schema, mongoose } = require("../db");

const statusSchema = new Schema(
    {
        name: {
            type: String,
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        number: {
            type: Number,
        }
    },
    { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;