const express = require('express');
const { registerRequest, signinRequest } = require('../middlewares/global/Authentication');
const { registerUser, signinUser } = require('../controllers/global/Authentication');

const userRouter = express.Router();

// Registration route
userRouter.post('/register', registerRequest, registerUser);
userRouter.post('/signin', signinRequest, signinUser);

module.exports = userRouter; 
