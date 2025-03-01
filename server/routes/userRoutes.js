const express = require('express');
const { registerRequest, signinRequest } = require('../middlewares/global/Authentication');
const { registerUser, signinUser } = require('../controllers/global/Authentication');

const { AccountRequest } = require('../middlewares/user/Account');
const { AccountUser } = require('../controllers/user/Account');

const userRouter = express.Router();

// Registration route
userRouter.post('/register', registerRequest, registerUser);
userRouter.post('/signin', signinRequest, signinUser);

userRouter.post('/balance', AccountRequest, AccountUser);

module.exports = userRouter; 
