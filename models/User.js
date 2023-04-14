const { Schema, mongoose } = require("../db");

const userSchema = new Schema(
  {
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    firstname: {
      type: String,
      required: [true, "Inserte un nombre."],
    },
    lastname: {
      type: String,
      required: [true, "Inserte un apellido."],
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Inserte un email."],
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: Object,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user.password;
  return user;
};

// Bcrypt - Password
// userSchema.pre('save', async function (next) {
//     if (this.isModified("password") || this.isNew) {
//         this.password = await bcrypt.hash(this.password, 8)
//         next();
//     }
// })

const User = mongoose.model("User", userSchema);
module.exports = User;
