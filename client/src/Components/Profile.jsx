import "./Profile.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
function Profile() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("posts");
  const [myprop,setmyprop]=useState({});
  const [userposts,setuserposts]=useState([]);
  const nav=useNavigate();
  const [edit,setedit]=useState(false);
  console.log("username",localStorage.getItem("username"));
  useEffect(() => {
  const username = localStorage.getItem("username");
  if (!username) return;

  fetch(`http://localhost:5000/api/profile/${username}`)
    .then(res => res.json())
    .then(data => {
      console.log("userdata from backend:", data); // ✅ should print
      setmyprop(data);
    })
    .catch(err => {
      console.error("Error fetching profile:", err);
    });
}, []);
  useEffect(() => {
        if(!localStorage.getItem("username")){
          return;
        }

      fetch(
        `http://localhost:5000/api/users/post/${localStorage.getItem("userId")}?page=${page}&limit=4`
      )
        .then(res => res.json())
        .then(data => {
          setuserposts(data.interviews);
          setTotalPages(data.totalPages);
        })
        .catch(err => console.error(err));

    }, [page]);

    console.log(`myprop${myprop}`);
       const userId = localStorage.getItem("userId"); // assuming you stored it on login
        const username = localStorage.getItem("username");
      
        const [formData, setFormData] = useState({
          name: "",          // real name
          bio: "",           // bio
        });
        const [error, setError] = useState("");
      
        // Fetch current user info on mount
        useEffect(() => {
          if (!username) return;
      
          fetch(`http://localhost:5000/api/profile/${username}`)
            .then(res => res.json())
            .then(data => {
              setFormData({
                name: data.username || "",
                bio: data.bio || "",
              });
            })
            .catch(err => console.error(err));
        }, [username]);
      
        const handleupdate = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };
      
        const handlesub = (e) => {
          e.preventDefault();
      
          // Basic validation
          if (!formData.name) {
            setError("Name and anonymous name cannot be empty");
            return;
          }
          setError("");
      
          // Update request
          fetch("http://localhost:5000/api/profile/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              bio: formData.bio,
              username: formData.name, // update real name
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.profile) {
                alert("Profile updated successfully!");
                nav("/profile"); // go back to profile page
              } else {
                setError(data.message || "Update failed");
              }
            })
            .catch(() => setError("Server error"));
        };

  return (<>
    <div className="profile-page">
      {/* COVER */}
      <Navbar/>
      <div className="profile-cover"></div>
      
      
      {/* MAIN */}
      <div className="profile-container">
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar-lg">
           {localStorage.getItem("username")[0]}
          </div>

          <div className="profile-details">
            <h1>@{myprop.username}</h1>
            <p className="bio">{myprop.bio}</p>

            <div className="profile-stats">
              <div>
                <span>{myprop.followersCount}</span>
                <p>Followers</p>
              </div>
              <div>
                <span>{myprop.followingCount}</span>
                <p>Following</p>
              </div>
            </div>

            <div className="profile-actions">

              <button className="edit-btn" onClick={()=>{
                setedit(true);
              }}>Edit Profile</button>
              <button className="edit-btn" onClick={()=>{
                localStorage.removeItem("userId");
                localStorage.removeItem("username")
                window.location.href = "/";
              }}>LogOut</button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="profile-tabs">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          
        </div>

        {/* TAB CONTENT */}
        <div className="profile-content">
          {activeTab === "posts" && (
            <div className="pgrid">
                {userposts.map(post => (
                <div key={post._id} style={{ color: "white"}}>
                  <div className="peoplepost-card">
                  <div style={{display:"flex",gap:"10%"}}><h4 style={{color:"rgba(37, 245, 22, 0.47)"}}>{post.company}</h4><p>{post.result}</p></div><br/>
                  <p style={{color:"rgba(232, 232, 222, 0.6)",fontFamily:"Times"}}>Role: {post.role}</p>
                  <p style={{color:"rgba(232, 232, 222, 0.6)",fontFamily:"Times"}}>UpVotes : {post.upvotes.length}</p>
                  <p style={{color:"rgba(232, 232, 222, 0.6)",fontFamily:"Times"}}>DownVotes: {post.downvotes.length}</p>
                    </div>
                  </div>
                  ))}
              
            </div>
          )}
          <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginTop: "20px"
            }}>
              <button style={{backgroundColor:"transparent",border:"none"}}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ◀◀
              </button>

              <span style={{ color: "white" }}>
                Page {page} of {totalPages}
              </span>

              <button style={{backgroundColor:"transparent",border:"none"}}
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                ▶▶
              </button>
            </div>
          

          {activeTab === "about" && (
            <div className="about-box">
              <h3>About</h3>
              <p>{myprop.bio}</p>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="activity-box">
              <p>Liked posts, comments, follows will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    {edit && (
      <div className="modal-overlay" onClick={() => setEdit(false)}>
        <div
          className="modal-box"
          onClick={(e) => e.stopPropagation()} // stop close on inner click
        >
          <h2 style={{fontFamily:"Times",padding:"5px"}}>Update Profile</h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handlesub}>
            <label style={{fontFamily:"Times"}}>Real Name: </label>
            <input style={{backgroundColor:"rgba(41, 39, 39, 0.6)",padding:"5px",border:"1px solid white",borderRadius:"5px",width:"80%"}}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleupdate}
            /><br/><br/>

            <label style={{fontFamily:"Times"}}>Bio </label>
            <input style={{backgroundColor:"rgba(41, 39, 39, 0.6)",padding:"5px",border:"1px solid white",borderRadius:"5px",width:"80%",marginLeft:"10%"}}
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleupdate}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button type="submit" style={{fontFamily:"Times",fontSize:"16px",backgroundColor:"transparent",border:"none",color:"rgb(23, 220, 161)",cursor:"pointer"}}>Update</button>
              <button type="button" onClick={() => setedit(false)} style={{fontFamily:"Times",fontSize:"16px",backgroundColor:"transparent",border:"none",color:"red",cursor:"pointer"}}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </>
  );
}

export default Profile;
