const mongoose = require("mongoose");

const faceAuthSchema = new mongoose.Schema({
    email: { type: String, required: true },
    faceData: { type: [Number] } // Storing face embeddings
});

module.exports = {
    FaceAuth: mongoose.model('FaceAuth', faceAuthSchema),
};
