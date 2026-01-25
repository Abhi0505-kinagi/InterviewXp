import "./Profile.css";
import { useState } from "react";

function Profile() {
  const [activeTab, setActiveTab] = useState("posts");

  const profile = {
    username: "abhishek_dev",
    bio: "Passionate MERN developer 🚀 | Interview Experiences | Learning in public",
    followers: 256,
    following: 143,
  };

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
            {profile.username[0].toUpperCase()}
          </div>

          <div className="profile-details">
            <h1>@{profile.username}</h1>
            <p className="bio">{profile.bio}</p>

            <div className="profile-stats">
              <div>
                <span>{profile.followers}</span>
                <p>Followers</p>
              </div>
              <div>
                <span>{profile.following}</span>
                <p>Following</p>
              </div>
            </div>

            <div className="profile-actions">
              <button className="follow-btn">Follow</button>
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
          <button
            className={activeTab === "activity" ? "active" : ""}
            onClick={() => setActiveTab("activity")}
          >
            Activity
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
              <p>{profile.bio}</p>
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
