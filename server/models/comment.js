const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewExperience",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    commentText: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

/* Prevent same user commenting twice on same interview */
commentSchema.index({ interviewId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Comment", commentSchema);
