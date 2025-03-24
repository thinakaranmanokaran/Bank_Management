// transactionController.js
const Transaction = require('../../models/user/Transactions');

// Create a new transaction
const createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get transaction by account number (sender or receiver)
const getTransactionsByAccountNo = async (req, res) => {
  try {
    const { accountno } = req.params;

    // Search for transactions where the account number matches either sender or receiver
    const transactions = await Transaction.find({
      $or: [
        { senderaccountno: accountno },
        { recieveraccountno: accountno }
      ]
    });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found for this account number' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTransaction, getAllTransactions, getTransactionById, getTransactionsByAccountNo };
