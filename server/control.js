const express = require('express');
const app=express();
const mongoose=require("mongoose");
const connectDB = require("./dbconnection");
connectDB();

const interviews=require("./models/InterviewExp")
const User=require("./models/Userschema")
const Comments=require("./models/comment")
const UserProfile=require("./models/UserProfile");
const InterviewExp = require('./models/InterviewExp');

app.use(express.json());
app.use(require("cors")());
app.get("/api/interviews", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 4;

    const interviewsData = await interviews
      .find({ status: "Public" }).populate("userId","name")
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    const total = await interviews.countDocuments({ status: "Public" });

    res.status(200).json({
      interviews: interviewsData,
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
app.get("/api/post/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Optional but good practice
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        // This fetches ALL posts of that user
        const data = await InterviewExp.find({ userId })
            .sort({ createdAt: -1 }); // latest first (optional)

        // Even if user has no posts, return empty array
        res.status(200).json({
            interviews: data
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Some error occurred while fetching posts"
        });
    }
});
//delete ur post
app.get("/api/admin/del/post/:id", async (req, res) => {
    try {
        const { id} = req.params;

        // Optional but good practice
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid postid" });
        }

        // This fetches ALL posts of that user
        const data = await InterviewExp.findByIdAndDelete({id})
        res.status(200).json({message:"post deleted successfully"});

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Some error occurred while deleting post posts"
        });
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
app.post("/api/users/login", async (req, res) => {
    const { name, password } = req.body;
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

//post ur comments on the posts
app.post("/api/interviews/:id/comment", async (req, res) => {
    try {
        const interviewId = req.params.id;
        const { userId, cmntText } = req.body;
        if (!userId || !cmntText) {
            return res.status(400).json({
                message: "userId and comment text are required"
            });
        }
        const interview = await interviews.findById(interviewId);
        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }
        const comment = await Comments.create({interviewId,userId,cmntText});
        return res.status(201).json({message: "Comment posted successfully",comment});
    } catch (err) {
        console.error("Error while commenting", err);
        res.status(500).json({ error: "An error occurred while commenting on post" });
    }
});

app.get("/api/interviews/:id/comment",async(req,res)=>{
    try{
        const intrvid=req.params.id;
        const intrfound=await interviews.findById(intrvid);
        if(!intrfound){
            return res.status(404).json({ message: "Interview not found" });
        }
        const data=await Comments.find({interviewId: intrvid}).populate("userId", "name").sort({ createdAt: -1 });
        return res.json(data);
    }
    catch(err){
        console.error("Error fetching comments", err);
        res.status(500).json({ error: "An error occurred while while fetching comments" });
    }
})
/* updating the user 
app.put("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Profile update failed" });
    }
});

update profile
app.put("/api/profile/update", async (req, res) => {
    try {
        const { userId, bio, profilePic } = req.body;
        const profile = await UserProfile.findOneAndUpdate(
            { userId },
            { bio},
            { new: true }
        );
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json({
            message: "Profile updated",
            profile
        });
    } catch (err) {
        res.status(500).json({ message: "Profile update failed" });
    }
});

 */
app.post("/api/profile/create", async (req, res) => {
    try {
        const { userId, bio } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const existingProfile = await UserProfile.findOne({
            $or: [{ userId }]
        });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }
        const profile = await UserProfile.create({
            userId,
            username:user.name,
            bio: bio || ""
        });
        res.status(201).json({
            message: "Profile created successfully",
            profile
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Profile creation failed" });
    }
});

app.get("/api/profile/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const profile = await UserProfile.findOne({ username })
            .populate("followers", "username")
            .populate("following", "username");
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({
            _id: profile._id,
            username: profile.username,
            bio: profile.bio,
            followersCount: profile.followers.length,
            followingCount: profile.following.length,
            followers: profile.followers,
            following: profile.following,
            createdAt: profile.createdAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching profile" });
    }
});



app.post("/api/profile/:username/follow", async (req, res) => {
    try {
        const { username } = req.params;
        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const targetProfile = await UserProfile.findOne({ username });
        if (!targetProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        if (targetProfile.userId.equals(userObjectId)) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }
        const currentUserProfile = await UserProfile.findOne({ userId: userObjectId });
        if (!currentUserProfile) {
            return res.status(404).json({ message: "Your profile not found" });
        }
        const alreadyFollowing = targetProfile.followers.some(followerId =>
            followerId.equals(userObjectId)
        );
        if (alreadyFollowing) {
            return res.status(400).json({ message: "Already following" });
        }
        targetProfile.followers.push(userObjectId);
        currentUserProfile.following.push(targetProfile.userId);
        await targetProfile.save();
        await currentUserProfile.save();
        res.status(200).json({
            message: "Followed successfully",
            followersCount: targetProfile.followers.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while following user" });
    }
});

app.post("/api/profile/:username/unfollow", async (req, res) => {
    try {
        const { username } = req.params;
        const { userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const targetProfile = await UserProfile.findOne({ username });
        if (!targetProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const currentUserProfile = await UserProfile.findOne({ userId: userObjectId });
        if (!currentUserProfile) {
            return res.status(404).json({ message: "Your profile not found" });
        }
        targetProfile.followers.pull(userObjectId);
        currentUserProfile.following.pull(targetProfile.userId);
        await targetProfile.save();
        await currentUserProfile.save();
        res.status(200).json({
            message: "Unfollowed successfully",
            followersCount: targetProfile.followers.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error while unfollowing user" });
    }
});


app.listen(5000, () => {
    console.log(`Server started on port`);
});