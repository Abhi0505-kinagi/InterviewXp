import { useEffect, useState, useRef } from "react";
import socket from "../socket";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import "./Chat.css"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import bgImage from "../assets/interviewxp.jpg"
function Chat() {
  const { roomId } = useParams();
  const nav = useNavigate();
  const endRef = useRef(null);

  if (!roomId) {
    return <p>No room selected</p>;
  }

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("userId");

  /* ---------------- LEAVE ROOM ---------------- */
  const leaveRoom = async () => {
    if (!window.confirm("Are you sure you want to leave this interview group?"))
      return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/rooms/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, userId }),
      });

      if (res.ok) nav("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- LOAD OLD MESSAGES ---------------- */
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/messages/${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => setMessages([]));
  }, [roomId]);

  /* ---------------- SOCKET ---------------- */
  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("new-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("new-message");
  }, [roomId]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
    if (file) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${BACKEND_URL}/api/upload-file`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      socket.emit("send-message", {
        room: roomId,
        sender: userId,
        messageType: "file",
        content: "file",
        fileUrl: data.fileUrl,
        fileName: data.fileName,
      });

      setFile(null);
      return;
    }

    if (!message.trim()) return;

    socket.emit("send-message", {
      room: roomId,
      sender: userId,
      messageType: "text",
      content: message,
    });

    setMessage("");
  };

  /* ---------------- STYLES ---------------- */
  const styles = {

    container: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },

    chatBox: {
      width: "460px",
      height: "560px",
      display: "flex",
      flexDirection: "column",
      borderRadius: "16px",
      background: "rgba(18,14,99,0.55)",
      backdropFilter: "blur(14px)",
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    },

    header: {
      padding: "12px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#fff",
      background: "linear-gradient(135deg,#281c3f,#5a28b4)",
      borderRadius: "16px 16px 0 0",
    },

    messages: {
      flex: 1,
      padding: "14px",
      overflowY: "auto",
      background: "rgba(7,10,30,0.85)",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },


    messageRow: {
      display: "flex",
      marginBottom: "10px",
    },

    message: {
      padding: "8px 12px",
      borderRadius: "14px",
      maxWidth: "75%",
      fontSize: "14px",
      lineHeight: "1.4",
    },

    username: {
      fontSize: "11px",
      fontWeight: "600",
      marginBottom: "2px",
      color: "#333",
    },

    time: {
      fontSize: "10px",
      marginTop: "4px",
      textAlign: "right",
      opacity: 0.7,
    },

    inputBox: {
      padding: "10px",
      background: "rgba(12,10,40,0.9)",
      backdropFilter: "blur(10px)",
      borderTop: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "0 0 16px 16px",
    },

    inputRow: {
      display: "flex",
      alignItems: "center",
    },

    input: {
      flex: 1,
      padding: "10px 12px",
      borderRadius: "20px",
      border: "none",
      outline: "none",
      background: "rgba(255,255,255,0.12)",
      color: "#fff",
    },

    button: {
      marginLeft: "10px",
      padding: "10px 16px",
      borderRadius: "50%",
      border: "none",
      background: "linear-gradient(135deg,#6f4cff,#8e2de2)",
      color: "#fff",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(111,76,255,0.5)",
    },

    fileLabel: {
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      marginBottom: "6px",
      display: "inline-block",
    },
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="page">
      <Navbar />

      <div style={styles.container}>
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <button
              onClick={leaveRoom}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ◀
            </button>
            <strong>Group Chat</strong>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, i) => {
              const isOwn = msg.sender._id === userId;
              return (
                <div
                  key={i}
                  style={{
                    ...styles.messageRow,
                    justifyContent: isOwn ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      ...styles.message,
                      background: isOwn
                        ? "linear-gradient(135deg,#6f4cff,#8e2de2)"
                        : "rgba(255,255,255,0.92)",
                      color: isOwn ? "#fff" : "#111",
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
                        rel="noreferrer"
                      >
                        📂 {msg.fileName}
                      </a>
                    ) : (
                      msg.content
                    )}

                    <div style={styles.time}>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.fileLabel}>
              📎 Attach file
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div style={styles.inputRow}>
              <input
                style={styles.input}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button style={styles.button} onClick={sendMessage}>
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
