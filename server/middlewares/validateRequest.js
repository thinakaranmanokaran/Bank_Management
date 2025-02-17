exports.validateRequest = (req, res, next) => {
    const { name, email, phone, password, gender, dob } = req.body;
  
    if (!name || !email || !phone || !password || !gender || !dob ) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    next();
  };

  exports.validateAddRequest = (req, res, next) => {
    const { email, password } = req.body;
  
    if ( !email || !password) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    next();
  };

  exports.projectAddRequest = (req, res, next) => {
    const { title, description, price, relation, stack, img, code, link, } = req.body;
  
    if ( !title || !description || !price || !relation || !stack || !img || !code || !link ) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    next();
  };
   