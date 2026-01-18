const express = require('express');
const app=express();
const mongoose=require("mongoose");
const connectDB = require("./dbconnection");
connectDB();
const interviews=require("./models/InterviewExp")
const User=require("./models/Userschema")
app.use(express.json());

app.get("/api/interviews", async (req, res) => {
    try {
        const data = await interviews.find(); 
        res.status(200).json(data); 
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ error: "Server Error" });
        }
    }
});
app.post("/api/interviews",async (req,res)=>{
    const data=req.body;
    try{
        const savedData=await interviews.create(data);
        res.status(201).json({message: "Interview saved successfully",data: savedData});
    }catch(err){
        console.error("Error saving interview:", err);
        res.status(500).json({error: "An error occurred while saving the interview"});
    }
})


app.get("/api/interviews/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid interview ID" });
        }
        const interview = await interviews.findById(id).populate("userId", "name email");
        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }
        res.status(200).json(interview);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/interviews/company/:company", async (req, res) => {
    try {
        const { company } = req.params;
        const interviews = await interviews.find({company: { $regex: company, $options: "i" }});//flexible serch regex
        if (interviews.length === 0) { return res.status(404).json({ message: "No interviews found" });}
        res.status(200).json(interviews);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/interviews/:id/upvote", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (
            !mongoose.Types.ObjectId.isValid(id) ||
            !mongoose.Types.ObjectId.isValid(userId)
        ) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        const interview = await interviews.findById(id);
        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }
        interview.downvotes.pull(userId);
        if (interview.upvotes.includes(userId)) {
            interview.upvotes.pull(userId); // remove upvote
        } else {
            interview.upvotes.push(userId); // add upvote
        }
        await interview.save();
        res.status(200).json({
            message: "Upvote updated",
            upvotes: interview.upvotes.length,
            downvotes: interview.downvotes.length
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/interviews/:id/downvote", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (
            !mongoose.Types.ObjectId.isValid(id) ||
            !mongoose.Types.ObjectId.isValid(userId)
        ) {
            return res.status(400).json({ message: "Invalid ID" });
        }
        const interview = await interviews.findById(id);
        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }
        interview.upvotes.pull(userId);
        if (interview.downvotes.includes(userId)) {
            interview.downvotes.pull(userId);
        } else {
            interview.downvotes.push(userId);
        }
        await interview.save();
        res.status(200).json({
            message: "Downvote updated",
            upvotes: interview.upvotes.length,
            downvotes: interview.downvotes.length
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
app.get("/api/users/login", async (req, res) => {
    const { name, password } = req.query;
    if (!name || !password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    try {
        const user = await User.findOne({ name: name, password: password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            message: "User login successfully",userId: user._id,name: user.name});
        } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error during login" });
    }
});

app.post("/api/users/register", async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.password) {
            return res.status(400).json({ message: "Please enter valid data" });
        }
        const existingUser = await User.findOne({ name: data.name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create(data);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        console.error("Error in registering User", err);
        res.status(500).json({ error: "An error occurred while registering user" });
    }
});



app.listen(5000, () => {
    console.log(`Server started on port`);
});