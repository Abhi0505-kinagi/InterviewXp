import { useEffect, useState } from "react";
import socket from "../socket";
import Navbar from "./Navbar";
import {useParams,useNavigate } from "react-router-dom";
const BACKEND_URL =import.meta.env.VITE_BACKEND_URL;
function Chat() {

    const { roomId } = useParams(); 
    if(!roomId){
        return (<p>No room selected </p>)
    }
    const nav=useNavigate();
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const userId = localStorage.getItem("userId");
    const leaveRoom = async (roomId, userId) => {
    if (!window.confirm("Are you sure you want to leave this interview group?")) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/rooms/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, userId }),
      });

      if (response.ok) {
        // Redirect or update UI state here
        nav("/rooms"); 
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.log("Error leaving room:", error);
    }
  };
  // load old messages
    useEffect(() => {
    fetch(`${BACKEND_URL}/api/messages/${roomId}`)
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

  const sendMessage = async () => {
    // FILE MESSAGE
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BACKEND_URL}/api/upload-file`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      socket.emit("send-message", {
        room: roomId,
        sender: userId,
        content:"file",
        messageType: "file",
        fileUrl: data.fileUrl,
        fileName: data.fileName
      });

      setFile(null);
      return;
    }

    // TEXT MESSAGE
    if (!message.trim()) return;

    socket.emit("send-message", {
      room: roomId,
      sender: userId,
      messageType: "text",
      content: message
    });

    setMessage("");
  };

  const styles = {
      container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        borderRadius:"5px"
      },

      chatBox: {
        width: "450px",
        height: "550px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid linear-gradient(135deg, rgb(108, 49, 218), rgb(90,40,180))",
        borderRadius: "10px",
        background: "#fff",
      },

      header: {
        padding: "10px",
        margin: 0,
        borderBottom: "1px solid #ddd",
        background: "linear-gradient(135deg, rgb(40, 28, 63), rgb(90,40,180))",
        fontFamily:"Times"
      },

      messages: {
        flex: 1,
        padding: "10px",
        overflowY: "auto",
        background: "rgba(9, 12, 33, 0.96)"
      },

      messageRow: {
        display: "flex",
        marginBottom: "8px"
      },

      message: {
        padding: "3px 5px",
        borderRadius: "10px",
        maxWidth: "75%",
        fontSize: "14px",
        color:"black",
        
      },

      username: {
        fontSize: "12px",
        fontWeight: "bold",
        marginBottom: "4px",
        color:"black"
      },

      time: {
        fontSize: "10px",
        marginTop: "4px",
        textAlign: "right",
        color: "#555"
      },

      inputBox: {
        padding: "10px",
        borderTop: "1px solid #ddd",
        background: "linear-gradient(135deg, rgb(40, 28, 63), rgb(90,40,180))"
      },

      input: {
        flex: 1,
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        outline: "none",
      },

      button: {
        marginLeft: "8px",
        padding: "8px 15px",
        border: "none",
        borderRadius: "5px",
        background: "#007bff",
        color: "#fff",
        cursor: "pointer"
      }
    };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.chatBox}>
         
          <h3 style={styles.header}> <button style={{background:"transparent",color:"blue",border:"none",position:"left",marginLeft:"0px",cursor:"pointer",margin:"10px"}} onClick={()=>{
            leaveRoom(roomId,userId)}
            }>◀◀</button>Group Chat</h3>

          <div style={styles.messages}>
            {messages.map((msg, i) => {
              const isOwn = msg.sender._id === userId;
              return (
                <div
                  key={i}
                  style={{
                    ...styles.messageRow,
                    justifyContent: isOwn ? "flex-end" : "flex-start"
                  }}
                >
                  <div
                    style={{
                      ...styles.message,
                      background: isOwn
                        ? "linear-gradient(135deg, rgba(120,70,200,0.7), rgba(74,38,115,0.7))"
                        : "linear-gradient(135deg, rgba(146, 66, 132, 0.86), rgba(74,38,115,0.7))",
                      color: isOwn ? "#fff" : "#000",
                      boxShadow: isOwn
                        ? "0 4px 12px rgba(120,70,200,0.35)"
                        : "0 2px 6px rgba(0,0,0,0.1)",
                      backdropFilter: isOwn ? "blur(6px)" : "none"
                    }}
                  >

                    {!isOwn && (
                      <div style={styles.username}>
                        {msg.sender.displayName}
                      </div>
                    )}

                    {msg.messageType === "file" ? (
                      <a
                        href={`${BACKEND_URL}${msg.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#00f", textDecoration: "underline" }}
                      >
                        📂 {msg.fileName}
                      </a>
                    ) : (
                      <div>{msg.content}</div>
                    )}
                    <div style={styles.time}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.inputBox}>
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              style={{ color: "red",backgroundColor:"black",width:"50%",padding:"5px",margin:"10px"}}
            /><br/>
            <div style={{display:"flex"}}>
              <input
              style={styles.input}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.button} onClick={sendMessage}>
              ▶▶
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
