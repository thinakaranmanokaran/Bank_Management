const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { registerRequest, signinRequest } = require('../middlewares/global/Authentication');
const { registerUser, signinUser, getUserNameByEmail } = require('../controllers/global/Authentication');

const { AccountRequest } = require('../middlewares/user/Account');
const { addAccountDetails, getAccountDetails, updateAccountDetails, getUserEmailByAccNo } = require('../controllers/user/Account');

const { verifyFace, registerFace } = require('../controllers/global/FaceAuth');
const { userDeposit } = require('../controllers/user/Deposit');
const { DepositRequest } = require('../middlewares/user/Deposit');
const { validateTransaction } = require('../middlewares/user/Transactions');
const { createTransaction, getAllTransactions, getTransactionById } = require('../controllers/user/Transactions');

// Registration route
userRouter.post('/register', registerRequest, registerUser);
userRouter.post('/signin', signinRequest, signinUser);

// Face Authentication routes (Added multer middleware)
userRouter.post('/register-face', upload.single('image'), registerFace);
userRouter.post('/verify-face', upload.single('image'), verifyFace);

userRouter.post('/balance', addAccountDetails );
userRouter.get('/balance/:accountno', getAccountDetails);
userRouter.put('/balance/:accountno', updateAccountDetails);

userRouter.get('/email/:accountno', getUserEmailByAccNo);
userRouter.get('/name/:email', getUserNameByEmail);

userRouter.post('/deposit', DepositRequest, userDeposit.createDeposit );
userRouter.get('/deposit', userDeposit.getAllDeposits );
userRouter.delete('/deposit/:accountno', userDeposit.deleteDeposit );

userRouter.post('/transaction', validateTransaction, createTransaction );
userRouter.get('/transactions', getAllTransactions);
userRouter.get('/transaction/:id', getTransactionById);

module.exports = userRouter;
