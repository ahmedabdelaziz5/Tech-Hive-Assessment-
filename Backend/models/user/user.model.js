const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: "male" },
    location: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: true, default: "default.png" },
    isVerified: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now() },
});

const User = mongoose.model('user', userSchema);

module.exports = User;