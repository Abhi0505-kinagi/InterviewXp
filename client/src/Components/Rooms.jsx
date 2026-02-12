import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const BACKEND_URL =import.meta.env.VITE_BACKEND_URL;
import roomimg from "../assets/image.png"
function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const nav=useNavigate();
  const user=localStorage.getItem("userId")
  // Fetch rooms
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data.rooms || []))
      .catch(err => console.log(err));
  }, []);

  const handleJoinRoom = async (roomId) => {
  try {
    // 1. Call your backend route
    const response = await fetch(`${BACKEND_URL}/api/rooms/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        roomId: roomId, 
        userId: user // Ensure you have access to the logged-in user's ID
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // 2. Only navigate if the backend successfully added the user
      nav(`/chat-rooms/${roomId}`);
      } else {
        // If user is already in room, you might still want to let them in
        if (data.message === "User already in room") {
          nav(`/chat-rooms/${roomId}`);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error("Join Error:", error);
      alert("Check your connection and try again.");
    }
  };
  // Create room
  const createRoom = async () => {
    if (!name.trim()) return alert("Room name required");

    const res = await fetch(`${BACKEND_URL}/api/rooms/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });

    const data = await res.json();
    if (res.ok) {
      setRooms(prev => [...prev, data.room]);
      setName("");
      setDescription("");
    } else {
      alert(data.message);
    }
  };
  const isMobile = window.innerWidth < 768;

  const styles = {

  page: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap",

  },

  /* CREATE ROOM */
    createRoom: {
        flex: "0 0 300px",
        height: "220px",
        background: "rgba(10, 15, 40, 0.85)",
        borderRadius: "20px",
        padding: "10px",
        border: "1px solid rgba(99, 102, 241, 0.18)",
        boxShadow:" 0 25px 50px rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(12px)",
        transition:"all 0.3s ease",
        position: isMobile ? "static" : "sticky",
        top: isMobile ? "auto" : "80px",
        width: isMobile ? "100%" : "auto"
        },
    input: {
        width: "100%",
        padding: "8px",
        marginBottom: "10px",
        backgroundColor: "transparent"
    },

    createBtn: {
        width: "100%",
        padding: "8px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius:"10px"
    },

    /* ROOMS */
    roomsSection: {
        flex: "1",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px"
    },

    roomsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "15px",
        marginTop: "10px"
    },
    roomCard: {
       /* border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "12px",
        cursor: "pointer",
        transition: "transform 0.2s",
        background: "#131e3a"*/
        background: "rgba(10, 15, 40, 0.85)",
        borderRadius: "20px",
        padding: "30px",
        border: "1px solid rgba(99, 102, 241, 0.18)",
        boxShadow:" 0 25px 50px rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(12px)",
        transition:" all 0.3s ease"

    },

    roomTitle: {
        color: "rgba(238, 35, 86, 0.96)",
        fontFamily: "Times"
    },

    roomDesc: {
        fontSize: "14px",
        marginBottom: "10px",
        fontFamily:"Times"
    },

    joinBtn: {
        padding: "6px 10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius:"4px"
    },
    roompage: {
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `
        linear-gradient(
          180deg,
          rgba(9, 8, 24, 0.8) 0%,
          rgba(75, 74, 85, 0.8) 45%,
          rgba(57, 56, 94, 0.8) 90%
        ),
        url(${roomimg})
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }
    };
    const deleteRoom = async (roomId) => {
        const res = await fetch(
            `${BACKEND_URL}/api/rooms/${roomId}`,
            { method: "DELETE" }
        );

        const data = await res.json();

        if (res.ok) {
            setRooms(prev => prev.filter(r => r._id !== roomId));
        } else {
            alert(data.message);
        }
        };


  return (
    <>
      <div style={styles.roompage}>
      <Navbar />

      <div style={styles.page}>
        {/* CREATE ROOM (FIXED SIZE) */}
        <div style={styles.createRoom}>
          <h3>Create Room</h3>
    
          <input 
            style={styles.input}
            placeholder="Room name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button style={styles.createBtn} onClick={createRoom}>
            Create
          </button>
        </div>

        {/* ROOMS GRID */}
        <div style={styles.roomsSection}>
          <h3 style={{fontFamily:"Times",color:"rgb(22, 241, 139)"}}>Available Rooms</h3>

          {rooms.length === 0 && <p>No rooms yet</p>}

          <div style={styles.roomsGrid}>
            {rooms.map(room => (
              <div
                key={room._id}
                style={styles.roomCard}
                //onClick={}
              >
                <h4 style={styles.roomTitle}>{room.name}</h4>
                <p style={styles.roomDesc}>{room.description}</p>
                <p style={styles.roomDesc}>Members : {room.members?.length||0}</p>
               <div style={{display:"flex",gap:"5%"}}>
                 <button 
                  style={styles.joinBtn} 
                  onClick={() => handleJoinRoom(room._id)}
                >
                  Join
                </button>
                <button onClick={() => deleteRoom(room._id)} style={{padding: "6px 10px",backgroundColor: "rgba(160, 14, 89, 0.48)",color: "white",border: "none",cursor: "pointer",borderRadius:"4px"}}>Delete</button>
               </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Rooms;
