const express = require("express");
const router = express.Router();
const Msg= require("../models/GroupChat");
const Room=require("../models/Room")
const multer = require("multer");
const { route } = require("./ml.routes");
const path = require("path");
const fs = require("fs");

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
router.post("/rooms/create", async (req, res) => {
    try{
        const {name,Admin,description,members}=req.body;
        let room=await Room.findOne({name});
        if(room){
            return res.status(400).json({message:"Room with this name already exist, Try other"})
        }
        room=new Room({name,Admin,description,members});
        await room.save();
        return res.status(200).json({message:"Room created successfully",room:{name,Admin,description}})
    }
    catch(err){
        if (process.env.NODE_ENV !== "production") {
        console.error("Debug Info", err);
        }
        return res.status(500).json({message:  `Server Error:${err}`});
    }
});

// DELETE ROOM
router.delete("/rooms/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.findByIdAndDelete(roomId);

    return res.status(200).json({
      message: "Room deleted successfully",
      roomId
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
        console.error("Debug Info", err);
    }
    return res.status(500).json({
      message: `Server Error: ${err.message}`
    });
  }
});


router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();

    if (rooms.length === 0) {
      return res.status(200).json({ message: "No rooms created yet", rooms: [] });
    }

    return res.status(200).json({
      message: "Rooms fetched successfully",
      rooms
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
        console.error("Debug Info", err);
    }
    return res.status(500).json({ message: `Server Error: ${err}` });
  }
});


router.get("/messages/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Msg.find({ room: roomId })
      .populate("sender", "displayName")
      .sort({ createdAt: 1 })
      .limit(50)
      .lean();

    return res.status(200).json({
      message: "Messages fetched successfully",
      messages
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
        console.error("Debug Info", err);
    }
    return res.status(500).json({ message: `Server Error: ${err}` });
  }
});

router.post("/rooms/join", async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    // 1. Basic validation
    if (!roomId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2. Atomic update using $addToSet
    // This handles finding the room AND checking for duplicates in one DB call
    const room = await Room.findByIdAndUpdate(
      roomId,
      { $addToSet: { members: userId } },
      { new: true } // Returns the updated document
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      message: "Joined room successfully",
      room
    });

  } catch (err) {
    // 3. Specific error handling (e.g., CastError for invalid IDs)
    if (err.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Room ID format" });
    }

    if (process.env.NODE_ENV !== "production") {
        console.error("Join Room Error:", err);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/rooms/leave", async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    if (!roomId || !userId) {
      return res.status(400).json({ message: "Missing roomId or userId" });
    }

    // $pull removes all instances of a value from an array
    const room = await Room.findByIdAndUpdate(
      roomId,
      { $pull: { members: userId } },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      message: "Left the room successfully",
      room
    });
  } catch (err) {

    if (process.env.NODE_ENV !== "production") {
        console.error("Leave Room Error:", err);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/upload-file", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error: Field name missing. Ensure the field name is 'file'." });
    } else if (err) {
      return res.status(500).json({ message: `Unknown error: ${err.message}` });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname
    });
  });
});


module.exports = router;
