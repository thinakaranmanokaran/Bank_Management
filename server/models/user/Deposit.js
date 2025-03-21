const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var depositSchema = new mongoose.Schema({
    accountno:{
        type:String,
        required:true,
        // unique:true,
    },
    balance:{
        type:String,
        required:true,
    },
});

//Export the model
const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;