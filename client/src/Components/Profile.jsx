import "./Profile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Profile() {
  const [edit, setEdit] = useState(false);
  const [myprop, setMyprop] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const nav = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  // Fetch profile and initialize formData
  useEffect(() => {
    if (!username || !token) {
      nav("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/profile/${username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setMyprop(data);
        setFormData({
          name: data.username || "",
          bio: data.bio || "",
        });
      } catch (err) {
        toast.error("Failed to fetch profile: " + err);
      }
    };

    fetchProfile();
  }, [username, token, nav]);

  // Fetch user posts
  useEffect(() => {
    if (!userId || !token) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/users/post/${userId}?page=${page}&limit=4`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setUserPosts(data.interviews || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        toast.error("Failed to fetch posts: " + err);
      }
    };

    fetchPosts();
  }, [page, userId, token]);

  // Edit form handlers
  const handleUpdate = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          username: formData.name,
          bio: formData.bio,
        }),
      });
      const data = await res.json();
      if (data.profile) {
        toast.success("Profile updated successfully!");
        setEdit(false);
        setMyprop(data.profile);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Unexpected server error: " + err);
    }
  };

  // Fetch followers/following
  const fetchFollowers = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/profile/${userId}/followers`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setFollowersList(data.followers || data || []);
    } catch {
      toast.error("Failed to load followers");
    }
  };

  const fetchFollowing = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/profile/${userId}/following`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setFollowingList(data.following || data || []);
    } catch {
      toast.error("Failed to load following");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    toast.info("Logged out successfully");
    nav("/login");
  };

  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="profile-cover"></div>

        {/* Profile Header */}
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar-lg">
              {username ? username[0] : "U"}
            </div>
            <div className="profile-details">
              <h1>@{myprop.username}</h1>
              <p className="bio">{myprop.bio}</p>

              <div className="profile-stats">
                <div>
                  <button
                    style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                    onClick={() => {
                      setShowFollowers(true);
                      fetchFollowers();
                    }}
                  >
                    <span>{myprop.followersCount || 0}</span>
                  </button>
                  <p>Followers</p>
                </div>
                <div>
                  <button
                    style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                    onClick={() => {
                      setShowFollowing(true);
                      fetchFollowing();
                    }}
                  >
                    <span>{myprop.followingCount || 0}</span>
                  </button>
                  <p>Following</p>
                </div>
              </div>

              <div className="profile-actions">
                <button className="edit-btn" onClick={() => setEdit(true)}>
                  Edit Profile
                </button>
                <button className="edit-btn" onClick={handleLogout}>
                  Logout
                </button>
                <button className="edit-btn" onClick={() => nav("/crtpost")}>
                  Create Post
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Tab Content */}
          <div className="profile-content">
            {activeTab === "posts" && (
              <div className="pgrid">
                {userPosts.map((post) => (
                  <div key={post._id} className="peoplepost-card">
                    <div style={{ display: "flex", gap: "10%" }}>
                      <h4 style={{ color: "rgba(37, 245, 22, 0.47)" }}>{post.company}</h4>
                      <p>{post.result}</p>
                    </div>
                    <p style={{ color: "rgba(232, 232, 222, 0.6)", fontFamily: "Times" }}>
                      Role: {post.role}
                    </p>
                    <p style={{ color: "rgba(232, 232, 222, 0.6)", fontFamily: "Times" }}>
                      UpVotes : {post.upvotes.length}
                    </p>
                    <p style={{ color: "rgba(232, 232, 222, 0.6)", fontFamily: "Times" }}>
                      DownVotes: {post.downvotes.length}
                    </p>
                  </div>
                ))}
                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px"}}>
                  <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{backgroundColor:"transparent",border:"none"}}>
                    ◀◀
                  </button>
                  <span style={{ color: "white" }}>
                    Page {page} of {totalPages}
                  </span>
                  <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{backgroundColor:"transparent",border:"none"}}>
                    ▶▶
                  </button>
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div className="about-box">
                <h3>About</h3>
                <p>{myprop.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {edit && (
        <div className="modal-overlay" onClick={() => setEdit(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: "Times", padding: "5px" }}>Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <label style={{ fontFamily: "Times" }}>Real Name: </label>
              <input
                style={{ backgroundColor: "rgba(41, 39, 39, 0.6)", padding: "5px", border: "1px solid white", borderRadius: "5px", width: "80%" }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleUpdate}
              />
              <br />
              <br />
              <label style={{ fontFamily: "Times" }}>Bio: </label>
              <input
                style={{ backgroundColor: "rgba(41, 39, 39, 0.6)", padding: "5px", border: "1px solid white", borderRadius: "5px", width: "80%", marginLeft: "10%" }}
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleUpdate}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button type="submit" style={{ fontFamily: "Times", fontSize: "16px", backgroundColor: "transparent", border: "none", color: "rgb(23, 220, 161)", cursor: "pointer" }}>
                  Update
                </button>
                <button type="button" onClick={() => setEdit(false)} style={{ fontFamily: "Times", fontSize: "16px", backgroundColor: "transparent", border: "none", color: "red", cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Followers Modal */}
      {showFollowers && (
        <div className="modal-overlay" onClick={() => setShowFollowers(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ width: "350px" }}>
            <h3 style={{ fontFamily: "Times" }}>Followers</h3>
            {followersList.length === 0 ? (
              <p>No followers yet</p>
            ) : (
              followersList.map((user) => (
                <div key={user._id} style={{ display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #444" }}>
                  <span>@{user.username}</span>
                  <span style={{ opacity: 0.7 }}>{user.name}</span>
                </div>
              ))
            )}
            <button style={{ marginTop: "10px", background: "transparent", border: "1px solid white", padding: "5px 10px", cursor: "pointer" }} onClick={() => setShowFollowers(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="modal-overlay" onClick={() => setShowFollowing(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ width: "350px" }}>
            <h3 style={{ fontFamily: "Times" }}>Following</h3>
            {followingList.length === 0 ? (
              <p>No following yet</p>
            ) : (
              followingList.map((user) => (
                <div key={user._id} style={{ display: "flex", justifyContent: "space-between", padding: "8px", borderBottom: "1px solid #444" }}>
                  <span>@{user.username}</span>
                  <span style={{ opacity: 0.7 }}>{user.name}</span>
                </div>
              ))
            )}
            <button style={{ marginTop: "10px", background: "transparent", border: "1px solid white", padding: "5px 10px", cursor: "pointer" }} onClick={() => setShowFollowing(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
