const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
const TransactionSchema = new mongoose.Schema({
    senderaccountno: {
        type: String,
        required: true,
    },
    sendername: {
        type: String,
        required: true,
    },
    senderemail: {
        type: String,
        required: true,
    },
    recieveraccountno: {
        type: String,
        required: true,
    },
    recievername: {
        type: String,
        required: true,
    },
    recieveremail: {
        type: String,
        required: true,
    },
    recievercurrbal: {
        type: Number,
        required: true,
    },
    recieverupdatebal: {
        type: Number,
        required: true,
    },
    sendercurrbal: {
        type: Number,
        required: true,
    },
    senderupdatebal: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
