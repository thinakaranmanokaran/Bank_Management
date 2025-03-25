const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the user schema
const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        select: false,
    },
    role: { type: String, default: "user" },
    position: { type: String, enum: ["Accountant", "Manager", "Other"], required: false },
    img: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Define the existing user schema
const signinSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        select: false,
    },
});

// Hash the password before saving for `userSchema`
registerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Hash the password before saving for `userAddSchema`
signinSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = {
    Authentication: mongoose.model("Authentication", registerSchema), // Single model for the 'users' collection
};
