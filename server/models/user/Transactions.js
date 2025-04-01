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
        type: String,
        required: true,
    },
    recieverupdatebal: {
        type: String,
        required: true,
    },
    sendercurrbal: {
        type: String,
        required: true,
    },
    senderupdatebal: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
