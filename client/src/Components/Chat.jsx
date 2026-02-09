import { useEffect, useState } from "react";
import socket from "../socket";
import Navbar from "./Navbar";
import {useParams } from "react-router-dom";
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
function Chat() {
    const { roomId } = useParams(); 
    if(!roomId){
        return (<p>No room selected </p>)
    }
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const userId = localStorage.getItem("userId");

  // load old messages
    useEffect(() => {
    fetch(`http://localhost:5000/api/messages/${roomId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      })
      .catch(() => setMessages([]));
  }, [roomId]);



  // socket listeners
  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("new-message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("new-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      room: roomId,
      sender: userId,
      content: message
    });

    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h3>Group Chat</h3>
        {Array.isArray(messages) && messages.map((msg, i) => (
        
        <p key={i}>
            <b>
            {msg.sender.displayName}
            </b>
            : {msg.content}
        </p>
        ))}



        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default Chat;
