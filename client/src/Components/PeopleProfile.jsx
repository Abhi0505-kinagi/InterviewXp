import { useParams } from "react-router-dom";
import "./PeoplesProfile.css";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
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
    fetch(`http://localhost:5000/api/profile/${username}`)
        .then(res => res.json())
        .then(data => {
            setuserprop(data);
        })
        .catch(err => {
            console.error(err);
        });
  },[]);
  console.log(userprop.userId);
  useEffect(() => {
      if (!userprop?.userId) return;

      fetch(
        `http://localhost:5000/api/users/post/${userprop.userId}?page=${page}&limit=4`
      )
        .then(res => res.json())
        .then(data => {
          setuserposts(data.interviews);
          setTotalPages(data.totalPages);
        })
        .catch(err => console.error(err));

    }, [userprop, page]); // 🔑 page dependency
    const fetchFollowers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/profile/${userprop.userId}/followers`
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
          `http://localhost:5000/api/profile/${userprop.userId}/following`
        );
        const data = await res.json();
        setFollowingList(data.following);
      } catch (err) {
        toast.error("Failed to load followers");
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
            {userprop?.username?.[0]?.toUpperCase() || "?"}
          </div>

          <div className="p-details">
            <h1>@{userprop.username}</h1>
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
              <button className="edit-btn" onClick={()=>{
                toast.info("This is feature is under update,let us inform you when it is ready")
              }}>shear Profile</button>
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
                  <div style={{display:"flex",gap:"10%"}}><h4 style={{color:"rgba(59, 247, 225, 0.8)"}}>{post.company}</h4><p style={{fontFamily:"Times",display:"flex"}}>status: <p style={{
                    color:
                            post.result === "Rejected"
                              ? "#be0620"
                              : post.result === "Pending"
                              ? "yellow"
                              : "green",
                          fontFamily: "Times",
                  }}>{"-"+post.result}</p></p></div>
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
                  <div className="people-overlay" onClick={() => setOpen(false)}>
                    <div
                      className="people-display-card"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        style={{ float: "right" }}
                        onClick={() => setOpen(false)}
                      >
                        ❌
                      </button>

                      <h2 style={{fontFamily:"Times",fontWeight:"bolder",color:"black"}}>Interview Experience</h2>
                      <p>Description...</p>
                      <h1 style={{color:"#361377"}}>{selectedPost.company}</h1>
                      <p style={{color:"black",fontFamily:"Times"}}><span style={{color:"black",fontFamily:"Times"}}>Experience Level:</span>{selectedPost.experienceLevel}</p>
                      <p><span style={{color:"black",fontFamily:"Times"}}>Difficulty Level:</span><strong
                        style={{
                          color:
                            selectedPost.difficulty === "Hard"
                              ? "#be0620"
                              : selectedPost.difficulty === "Medium"
                              ? "orange"
                              : "green",
                          fontFamily: "Times",
                        }}
                      >{selectedPost.difficulty}
                      </strong></p>

                      <p style={{color:"black",fontFamily:"Times"}}>Number of Rounds {selectedPost.rounds.length}</p>
                     <p>Topics</p>
                      <div style={{ marginTop: '8px' }}>
                        {selectedPost.tags?.map((tag, i) => (
                          <span
                            key={i}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#413e3e',
                              color: '#0bb90e',
                              padding: '2px 8px',
                              margin: '0 4px 4px 0',
                              borderRadius: '4px',
                              fontSize: '0.9rem',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <p><span style={{color:"black",fontFamily:"Times"}}>Tips : </span><span style={{color:"#16601c",fontFamily:"Times"}}>{selectedPost.tips}</span></p>
                      {Array.isArray(selectedPost.rounds) && selectedPost.rounds.map((round) => (
                        <div key={round._id} className="round-card">
                          <h3 style={{color:"black",fontFamily:"Times",fontSize:"15px"}}>{round.roundName}</h3>
                          <p  style={{color:"black",fontFamily:"Times",fontSize:"17px",marginLeft:"10px"}}>●Question: {round.questions} <p  style={{color:"black",fontFamily:"Times",fontSize:"12px",marginLeft:"10px"}}>Description: {round.description}</p></p>
                        
                        </div>
                      ))}
                      <h3 style={{color:"black", fontFamily:"Times"}}>Questions</h3>
                      <p style={{color:"black",font:"Times",fontSize:"14px"}}>{selectedPost.askedqutns}</p>
                      <p style={{bottom:"5px",color:"#0f0a17",fontFamily:"Times"}}>▶▶{selectedPost.userId?.name}</p><br/>
                      <p style={{fontFamily:"Times",color:"black",fontWeight:"bolder"}}>AI Summarization:</p>
                      <fieldset>
                        <textarea readOnly style={{width:"100%",maxHeight:"80px",maxWidth:"100%"}}></textarea>
                      </fieldset>
                      <p style={{fontSize:"10px",color:"black",fontFamily:"Times"}}><i>Note:We use AI to enhance our content creation processut,but all content is reviewed and edited by our human team to ensur accuracy and quality.</i></p>
                      <button
                        style={{ float: "right",backgroundColor:"transparent",color:"#db0f2e",fontFamily:"Times",border:"2px",fontSize:"20px" }}
                        onClick={() => setOpen(false)}
                      >
                        close
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
