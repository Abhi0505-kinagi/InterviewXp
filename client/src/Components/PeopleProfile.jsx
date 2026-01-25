import { useParams } from "react-router-dom";
import "./Profile.css";
import { useState,useEffect } from "react";
function PeopleProfile() {
    const [userprop,setuserprop]=useState("");
    const [activeTab, setActiveTab] = useState("posts");
    const {username}=useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/api/profile/${username}`)
        .then(res => res.json())
        .then(data => {
            setuserprop(data);
        })
        .catch(err => {
            console.error(err);
        });
  },[]);

  return (<>
    <div className="profile-page">
      {/* COVER */}
      <header>
        <h1 style={{fontSize:"30px"}}>InterviewXP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/posts">Experiences</a>
          <a href="/profile">Prepare</a>
          <a href="/login">Login</a>
        </nav>
      </header>
      <div className="profile-cover"></div>
      
      
      {/* MAIN */}
      <div className="profile-container">
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar-lg">
            {userprop?.username?.[0]?.toUpperCase() || "?"}
          </div>

          <div className="profile-details">
            <h1>@{userprop.username}</h1>
            <p className="bio">{userprop.bio}</p>

            <div className="profile-stats">
              <div>
                <span>{userprop.followersCount}</span>
                <p>Followers</p>
              </div>
              <div>
                <span>{userprop.followingCount}</span>
                <p>Following</p>
              </div>
            </div>

            <div className="profile-actions">
              <button className="follow-btn">Follow</button>
              <button className="edit-btn">shear Profile</button>
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
              <p>{userprop.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default PeopleProfile;
