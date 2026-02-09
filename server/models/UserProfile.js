const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true   // one profile per user
    },
    username:{
        type: String,
        required: true,
        unique: true,
        
    },
    bio: {
        type: String,
        default: ""
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
