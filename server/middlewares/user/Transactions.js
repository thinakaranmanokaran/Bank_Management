// transactionMiddleware.js
const Transaction = require('../../models/user/Transactions');

// Middleware to validate transaction data
const validateTransaction = async (req, res, next) => {
    const { senderaccountno, sendername, senderemail, recieveraccountno, recievername, recieveremail, amount } = req.body;

    if (!senderaccountno || !sendername || !senderemail || !recieveraccountno || !recievername || !recieveremail || !amount) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure amount is a valid number
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    next();
};

module.exports = { validateTransaction };
