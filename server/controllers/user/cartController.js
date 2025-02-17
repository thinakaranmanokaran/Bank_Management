const Cart = require("../../models/Cart"); // Import properly

exports.addToCart = async (req, res) => {
  try {
    const { email, cart } = req.body;

    if (!Array.isArray(cart)) {
      return res.status(400).json({ message: "Cart must be an array" });
    }

    // Find user cart by email
    let userCart = await Cart.findOne({ email });

    if (userCart) {
      // Ensure existing cart is an array before spreading
      const existingCart = Array.isArray(userCart.cart) ? userCart.cart : [];

      // Avoid duplicate project IDs in the cart
      const updatedCart = [...new Set([...existingCart, ...cart])];
      userCart.cart = updatedCart;
      await userCart.save();
    } else {
      userCart = await Cart.create({ email, cart: cart });
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Cart updated successfully",
        cart: userCart.cart,
      });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { email, wishlist } = req.body;

    if (!Array.isArray(wishlist)) {
      return res.status(400).json({ message: "Cart must be an array" });
    }

    // Find user cart by email
    let userWishlist = await Cart.findOne({ email }); 

    if (userWishlist) {
      // Ensure existing cart is an array before spreading
      const existingWishlist = Array.isArray(userWishlist.wishlist) ? userWishlist.wishlist : [];

      // Avoid duplicate project IDs in the cart
      const updatedWishlist = [...new Set([...existingWishlist, ...wishlist])];
      userWishlist.wishlist = updatedWishlist;
      await userWishlist.save();
    } else {
      userWishlist = await Cart.create({ email, wishlist: wishlist });
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Cart updated successfully",
        wishlist: userWishlist.wishlist,
      });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.cartGet = async (req, res) => {
  try {
    const carts = await Cart.find(); // Fetch all projects from MongoDB
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
}