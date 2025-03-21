// const { Deposit } = require('../models/depositModel');

const Deposit = require("../../models/user/Deposit");

// @desc    Create a new deposit
// @route   POST /api/deposit
// @access  Public
const createDeposit = async (req, res) => {
    const { accountno, balance } = req.body;

    try {
        const deposit = new Deposit({ accountno, balance });
        await deposit.save();
        res.status(201).json({ message: 'Application sent successfully', deposit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all deposits
// @route   GET /api/deposit
// @access  Public
const getAllDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.find();
        res.status(200).json(deposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a specific deposit by account number
// @route   GET /api/deposit/:accountno
// @access  Public
const getDepositByAccountNo = async (req, res) => {
    try {
        const { accountno } = req.params;
        const deposit = await Deposit.findOne({ accountno });

        if (!deposit) {
            return res.status(404).json({ message: 'Deposit not found' });
        }

        res.status(200).json(deposit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a deposit by account number
// @route   PUT /api/deposit/:accountno
// @access  Public
const updateDeposit = async (req, res) => {
    try {
        const { accountno } = req.params;
        const { balance } = req.body;

        const updatedDeposit = await Deposit.findOneAndUpdate(
            { accountno },
            { balance },
            { new: true, runValidators: true }
        );

        if (!updatedDeposit) {
            return res.status(404).json({ message: 'Deposit not found' });
        }

        res.status(200).json({ message: 'Deposit updated successfully', updatedDeposit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a deposit by account number
// @route   DELETE /api/deposit/:accountno
// @access  Public
const deleteDeposit = async (req, res) => {
    try {
        const { accountno } = req.params;

        const deletedDeposit = await Deposit.findOneAndDelete({ accountno });

        if (!deletedDeposit) {
            return res.status(404).json({ message: 'Deposit not found' });
        }

        res.status(200).json({ message: 'Deposit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exporting with the name 'userDeposit'
module.exports = {
    userDeposit: {
        createDeposit,
        getAllDeposits,
        getDepositByAccountNo,
        updateDeposit,
        deleteDeposit
    }
};
