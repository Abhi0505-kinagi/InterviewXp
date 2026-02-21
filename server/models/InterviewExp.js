const mongoose = require("mongoose");

const interviewExpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        enum: ["Fresher", "Intern", "Junior", "Mid", "Senior"],
        required: true
    },
    rounds: [
        {
            roundName: {
                type: String,
            },
            questions: {
                type: String,
                required: true
            },
            description: String
        }
    ],
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    result: {
        type: String,
        enum: ["Selected", "Rejected", "Pending"],
        required: true
    },
    tips: String,
    tags: [String],
    status: {
        type: String,
        enum: ["Public", "Private", "Draft"],
        default: "Public"
    },
    askedqutns:{
        type:String,
        required:true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [] 
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [] 
    }]
}, { timestamps: true });
interviewExpSchema.index({ userId: 1 });
interviewExpSchema.index({ status: 1, createdAt: -1 });
interviewExpSchema.index({ company: 1, role: 1 });
interviewExpSchema.index({ status: 1, difficulty: 1, createdAt: -1 });
interviewExpSchema.index({ tags: 1 });
interviewExpSchema.index(
  { company: 1 },
  { collation: { locale: "en", strength: 2 } }
);
interviewExpSchema.index({
  company: "text",
  role: "text",
  tags: "text",
  tips: "text",
  askedqutns: "text"
});

module.exports = mongoose.model("InterviewExperience", interviewExpSchema);
