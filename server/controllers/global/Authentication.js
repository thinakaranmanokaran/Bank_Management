const { Authentication } = require('./../../models/global/Authentication');
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
      position,
      img,
    } = req.body;

    // Get admin email from environment variable
    const adminEmail = process.env.ADMIN_MAIL;
    const employeeEmail = process.env.EMP_MAIL;

    // Check if the email matches the admin email
    const userRole = email === adminEmail ? 'admin' : email === employeeEmail ? 'employee' : role;

    // Attempt to create a new user
    const user = await Authentication.create({
      name,
      email,
      phone,
      password,
      gender,
      dob,
      role: userRole,
      position,
      img,
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


exports.getAuthData = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await Authentication.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const { img } = req.body;

    if (!img) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const updateIMG = await Authentication.findOneAndUpdate(
      { email },
      { $set: { img } }, // Use $set to specifically update the img field
      { new: true, runValidators: true }
    );

    if (!updateIMG) {
      return res.status(404).json({ message: 'image not found' });
    }

    res.status(200).json({ message: 'image updated successfully', updateIMG });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Register a new user

// Check if user exists (Login)
exports.signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the 'users' collection
    const user = await Authentication.findOne({ email }).select('+password');
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

exports.getUserNameByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await Authentication.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's name
    res.status(200).json({ name: user.name });
  } catch (error) {
    console.error('Error in getUserNameByEmail:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


