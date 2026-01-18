const mongoose = require("mongoose"); 
const url = "mongodb://localhost:27017/myapp"; 

const connectDB = async () => {
    try {
        // This connects Mongoose specifically
        await mongoose.connect(url); 
        console.log("MongoDB connection is successful");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1); // Stop app if DB fails
    }
};

module.exports = connectDB;