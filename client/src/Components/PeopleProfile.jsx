import { useParams } from "react-router-dom";
import "./PeoplesProfile.css";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;;
function PeopleProfile() {
    const nav=useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userprop,setuserprop]=useState("");
    const [activeTab, setActiveTab] = useState("posts");
    const {username}=useParams();
    const [userposts,setuserposts]=useState([]);
    const [open,setOpen]=useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showFollowers, setShowFollowers] = useState(false);
    const [followersList, setFollowersList] = useState([]);
    const [showFollowing, setShowFollowing] = useState(false);
    const [followingList, setFollowingList] = useState([]);
    const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/profile/${username}`)
        .then(res => res.json())
        .then(data => {
            setuserprop(data);
        })
        .catch(err => {
            toast.error("Error occured:"+err);
        });
  },[]);
  useEffect(() => {
      if (!userprop?.userId) return;

      fetch(
        `${BACKEND_URL}/api/users/post/${userprop.userId}?page=${page}&limit=4`
      )
        .then(res => res.json())
        .then(data => {
          setuserposts(data.interviews);
          setTotalPages(data.totalPages);
        })
        .catch(err => toast.error("Error occured:"+err));

    }, [userprop, page]); // 🔑 page dependency
    const fetchFollowers = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/profile/${userprop.userId}/followers`
        );
        const data = await res.json();
        setFollowersList(data.followers);
      } catch (err) {
        toast.error("Failed to load followers");
      }
    };
    const fetchFollowing = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/profile/${userprop.userId}/following`
        );
        const data = await res.json();
        setFollowingList(data.following);
      } catch (err) {
        toast.error("Failed to load followers");
      }
    };
    const handleShare = async () => {
    const profileURL = `${window.location.origin}/profile/${username}`;

    // Use Web Share API if available (mobile friendly)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this profile",
          text: "Here’s a profile I wanted to share with you:",
          url: profileURL,
        });
        toast.success("Profile shared successfully!");
      } catch (err) {
        toast.error("Failed to share profile");
      }
    } else {
      // fallback: copy to clipboard
      navigator.clipboard.writeText(profileURL)
        .then(() => toast.success("Profile link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };
    

  return (<>
    <div className="p-page">
      {/* COVER */}
      <Navbar/>
      <div className="p-cover"></div>
      
      {/* MAIN */}
      <div className="p-container">
        {/* HEADER */}
         
        <div className="p-header">
           <button onClick={()=>{ nav("/posts")}} style={{backgroundColor:"green",padding:"10px",border:"none"}}>◀◀</button>
          <div className="p-avatar-lg">
            {userprop?.displayName?.[0]?.toUpperCase() || "?"}
          </div>

          <div className="p-details">
            <h1>@{userprop.displayName}</h1>
            <p className="bio">{userprop.bio}</p>

            <div className="p-stats">
              <div><button style={{backgroundColor:"transparent",border:"none",cursor:"pointer"}}   onClick={() => { setShowFollowers(true); fetchFollowers();}}>
               <span>{userprop.followersCount}</span>
              </button>
                <p>Followers</p>
              </div>
              <div>
                <button style={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={() => { setShowFollowing(true); fetchFollowing();}}>
                <span>{userprop.followingCount}</span>
              </button>
                <p>Following</p>
              </div>
            </div>

            <div className="p-actions">
              {/*<button className="follow-btn" onClick={()=>{
                toast.info("you started following:"+userprop.username);
              }}>Follow</button>*/}
              <button className="edit-btn" onClick={handleShare}>Share Profile</button>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="p-tabs">
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
        <div className="p-content">
          {activeTab === "posts" && (
            <div className="pgrid">
                {userposts.map(post => (
                <div key={post._id} style={{ color: "white"}}>
                  <div className="peoplepost-card">
                  <div style={{display:"flex",gap:"10%"}}><h4 style={{color:"rgba(59, 247, 225, 0.8)"}}>{post.company}</h4><p style={{fontFamily:"Times",display:"flex"}}>status: <span style={{
                    color:
                            post.result === "Rejected"
                              ? "#be0620"
                              : post.result === "Pending"
                              ? "yellow"
                              : "green",
                          fontFamily: "Times",
                  }}>{"-"+post.result}</span></p></div>
                  <p style={{color:"rgba(232, 232, 222, 0.6)",fontFamily:"Times"}}>Role: {post.role}</p>
                  <p style={{color:"rgba(232, 232, 222, 0.6)",fontFamily:"Times"}}>UpVotes : {post.upvotes.length}</p>
                  <p style={{color:"rgba(232, 232, 222, 0.6)",fontFamily:"Times"}}>DownVotes: {post.downvotes.length}</p>
                  <button style={{backgroundColor:"transparent",fontFamily:"Times",border:"none",padding:"3px",cursor:"pointer"}} onClick={()=>{setSelectedPost(post); setOpen(true)}}>Read More▶▶</button>
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
              <p>{userprop.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    {open && selectedPost && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="display-card" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

            <h2 className="title">Interview Experience</h2>
            <p className="muted">Description...</p>

            <h1 className="company">{selectedPost.company}</h1>

            <p className="info">
              <span>Experience Level:</span> {selectedPost.experienceLevel}
            </p>

            <p className="info">
              <span>Difficulty:</span>
              <strong
                className={`difficulty ${selectedPost.difficulty?.toLowerCase()}`}
              >
                {selectedPost.difficulty}
              </strong>
            </p>

            <p className="info">
              Number of Rounds: {selectedPost.rounds?.length}
            </p>

            <p className="muted">Topics:</p>
            <div className="tags">
              {selectedPost.tags?.map((tag, i) => (
                <span key={i} className="tag">#{tag}</span>
              ))}
            </div>

            <p className="tips">
              <span>Tips:</span> {selectedPost.tips}
            </p>

            <p className="muted">Round Descriptions:</p>

            {Array.isArray(selectedPost.rounds) &&
              selectedPost.rounds.map((round) => (
                <div key={round._id} className="round-card">
                  <h3>{round.roundName}</h3>
                  <p>● Question: {round.questions}</p>
                  <p className="round-desc">
                    Description: {round.description}
                  </p>
                </div>
              ))}

            <h3 className="muted">Questions</h3>
            <p className="content">{selectedPost.askedqutns}</p>

            <p className="posted">posted by</p>
            <p className="author">
              ▶▶ {selectedPost.userId?.displayName}
            </p>

            <h3 className="ml-title">AI Summarization</h3>

            <textarea
              className="ai-box"
              readOnly
              placeholder="AI summary will appear here..."
            />

            <p className="note">
              <i>
                Note: We use AI to enhance content, but all summaries are reviewed
                by humans for accuracy and quality.
              </i>
            </p>

            <button className="close-footer" onClick={() => setOpen(false)}>
              Close
            </button>

          </div>
        </div>
      )}

        {showFollowers && (
      <div className="modal-overlay" onClick={() => setShowFollowers(false)}>
        <div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          style={{ width: "350px" }}
        >
          <h3 style={{ fontFamily: "Times" }}>Followers</h3>

          {followersList.length === 0 ? (
            <p>No followers yet</p>
          ) : (
            followersList.map((user) => (
              <div
                key={user._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderBottom: "1px solid #444"
                }}
              >
                <span>@{user.username}</span>
                <span style={{ opacity: 0.7 }}>{user.name}</span>
              </div>
            ))
          )}

          <button
            style={{
              marginTop: "10px",
              background: "transparent",
              border: "1px solid white",
              padding: "5px 10px",
              cursor: "pointer"
            }}
            onClick={() => setShowFollowers(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}
    {showFollowing && (
      <div className="modal-overlay" onClick={() => setShowFollowing(false)}>
        <div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          style={{ width: "350px" }}
        >
          <h3 style={{ fontFamily: "Times" }}>Following</h3>

          {followingList.length === 0 ? (
            <p>No followers yet</p>
          ) : (
            followingList.map((user) => (
              <div
                key={user._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderBottom: "1px solid #444"
                }}
              >
                <span>@{user.username}</span>
                <span style={{ opacity: 0.7 }}>{user.name}</span>
              </div>
            ))
          )}

          <button
            style={{
              marginTop: "10px",
              background: "transparent",
              border: "1px solid white",
              padding: "5px 10px",
              cursor: "pointer"
            }}
            onClick={() => setShowFollowing(false)}
          >
            Close
          </button>
        </div>
      </div>
    )}

    
    </>
  );
}

export default PeopleProfile;
