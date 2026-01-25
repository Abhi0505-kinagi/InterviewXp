import "./Profile.css";
import { useState,useEffect } from "react";
import Navbar from "./Navbar";
function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [myprop,setmyprop]=useState({});
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

    console.log(`myprop${myprop}`);
  

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
            {myprop.username[0].toUpperCase()|| "A"}
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

              <button className="edit-btn">Edit Profile</button>
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
            <div className="grid">
              <div className="post-card">Post 1</div>
              <div className="post-card">Post 2</div>
              <div className="post-card">Post 3</div>
              <div className="post-card">Post 4</div>
            </div>
          )}

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
    </>
  );
}

export default Profile;
