const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { registerRequest, signinRequest } = require('../middlewares/global/Authentication');
const { registerUser, signinUser } = require('../controllers/global/Authentication');

const { AccountRequest } = require('../middlewares/user/Account');
const { AccountUser } = require('../controllers/user/Account');

const { verifyFace, registerFace } = require('../controllers/global/FaceAuth');

// Registration route
userRouter.post('/register', registerRequest, registerUser);
userRouter.post('/signin', signinRequest, signinUser);

// Face Authentication routes (Added multer middleware)
userRouter.post('/register-face', upload.single('image'), registerFace);
userRouter.post('/verify-face', upload.single('image'), verifyFace);

userRouter.post('/balance', AccountUser);

module.exports = userRouter;
