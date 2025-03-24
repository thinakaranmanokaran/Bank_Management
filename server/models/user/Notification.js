const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
const NotificationSchema = new mongoose.Schema({
    accountno: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
