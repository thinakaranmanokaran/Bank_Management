const { User, ExistingUser } = require('./../../models/User');
const sendToken = require('./../../utils/jwtHelper');
const bcrypt = require('bcryptjs'); // For password hashing and comparison

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender,
      dob,
      role,
    } = req.body;
    
    // Attempt to create a new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      gender,
      dob,
      role,
    });

    // Send token as response
    sendToken(user, 201, res);
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Handle other errors
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register a new user

// Check if user exists (Login)
exports.addUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the 'users' collection
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User email not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // return res.status(200).json({ message: 'Success', user });
    sendToken(user, 200, res);
  } catch (error) {
    console.error('Error in addUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

