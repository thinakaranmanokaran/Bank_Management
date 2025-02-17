exports.cartRequest = (req, res, next) => {
    const { email, cart } = req.body;
  
    if ( !email || !cart ) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    next();
  };

  exports.wishlistRequest = (req, res, next) => {
    const { email, wishlist } = req.body;
  
    if ( !email || !wishlist ) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    next();
  };