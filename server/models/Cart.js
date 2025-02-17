const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cart: { type: [String], default: [] },
    wishlist: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
