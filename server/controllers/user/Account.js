const sendAccNo = require('../../utils/accountNo');
const { Account } = require('./../../models/user/Account')
const mongoose = require('mongoose');

const generateUniqueAccountNo = async () => {
    let isUnique = false;
    let accountNo;

    while (!isUnique) {
        accountNo = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const existingAccount = await Account.findOne({ accountno: accountNo });

        if (!existingAccount) {
            isUnique = true;
        }
    }
    return accountNo;
};

// Add Account Details
exports.addAccountDetails = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already has an account
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ success: false, message: 'Account already exists!' });
        }

        // Generate a unique account number
        const accountno = await generateUniqueAccountNo();

        const newAccount = new Account({
            email,
            accountno,
            balance: 0, // Default balance
        });

        await newAccount.save();
        sendAccNo(newAccount, 201, res);
        // res.status(201).json({ success: true, message: 'Account created successfully!', accountno });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.setAccountDetails = async (req, res) => {
    try {
        const { email } = req.body;

        // Query the 'users' collection
        const user = await Account.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User email not found' });
        }

        // return res.status(200).json({ message: 'Success', user });
        sendAccNo(user, 200, res);
    } catch (error) {
        console.error('Error in addUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Account Details
exports.getAccountDetails = async (req, res) => {
    try {
        const { accountno } = req.params;
        const account = await Account.findOne({ accountno });

        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found!' });
        }

        res.status(200).json({ success: true, account });
        console.log('Received account number:', req.body.accountno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get Account Details
exports.getAccountDetailsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const account = await Account.findOne({ email });

        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found!' });
        }

        res.status(200).json({ success: true, account });
        console.log('Received account number:', req.body.accountno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update Account Balance
exports.updateAccountDetails = async (req, res) => {
    try {
        const { accountno } = req.params;
        const { balance } = req.body; // ✅ Using balance instead of amount

        // Validate if balance is a number
        if (isNaN(balance)) {
            return res.status(400).json({ success: false, message: 'Invalid balance' });
        }

        const account = await Account.findOne({ accountno });

        if (!account) {
            return res.status(404).json({ success: false, message: 'Account not found!' });
        }

        // Update balance directly
        account.balance = Number(account.balance) + Number(balance);
        await account.save();

        res.status(200).json({ success: true, message: 'Account updated successfully!', account });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


exports.getUserEmailByAccNo = async (req, res) => {
    try {
        const { accountno } = req.params;

        // Find the user by email
        const user = await Account.findOne({ accountno });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's name
        res.status(200).json({ email: user.email });
    } catch (error) {
        console.error('Error in getUserNameByEmail:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
