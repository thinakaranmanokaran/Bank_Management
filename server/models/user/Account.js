const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var Account = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    accountno: {
        type: String,
        unique: true,
    },
    balance: {
        type: Number, // ✅ Change from String to Number
        default: 0,
    },
});

// Export the model
module.exports = {
    Account: mongoose.model('Account', Account),
};
