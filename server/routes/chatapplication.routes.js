const express = require("express");
const router = express.Router();
const Msg= require("../models/GroupChat");
const Room=require("../models/Room")

router.post("/rooms/create", async (req, res) => {
    try{
        const {name,description,members}=req.body;
        let room=await Room.findOne({name});
        if(room){
            return res.status(400).json({message:"Room with this name already exist, Try other"})
        }
        room=new Room({name,description,members});
        await room.save();
        return res.status(200).json({message:"Room created successfully",room:{name,description}})
    }
    catch(err){
        console.log(err);
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
    console.error(err);
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
    console.log(err);
    return res.status(500).json({ message: `Server Error: ${err}` });
  }
});


router.get("/messages/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Msg.find({ room: roomId })
      .populate("sender", "displayName")
      .sort({ createdAt: 1 })
      .limit(50);

    return res.status(200).json({
      message: "Messages fetched successfully",
      messages
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Server Error: ${err}` });
  }
});

router.post("/rooms/join", async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.members.includes(userId)) {
      return res.status(400).json({ message: "User already in room" });
    }

    room.members.push(userId);
    await room.save();

    return res.status(200).json({
      message: "Joined room successfully",
      room
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Server Error: ${err}` });
  }
});


module.exports = router;
