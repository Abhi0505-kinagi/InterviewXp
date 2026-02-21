const mongoose = require("mongoose"); 
const url = process.env.DB_URL;
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
//{ autoIndex:true }