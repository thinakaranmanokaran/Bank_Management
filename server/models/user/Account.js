const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var Account = new mongoose.Schema({
    email:{
        type:String,
        // required:true,
        unique:true,
    },
    accountno:{
        type:String,
        // required:true,
        unique:true,
    },
    balance:{
        type:String,
        // required:true,
    },
});

//Export the model
module.exports = {
    Account: mongoose.model('Account', Account),
};