import { useParams } from "react-router-dom";
import "./PeoplesProfile.css";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
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


  return (<>
    <div className="p-page">
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
              <div>
                <span>{userprop.followersCount}</span>
                <p>Followers</p>
              </div>
              <div>
                <span>{userprop.followingCount}</span>
                <p>Following</p>
              </div>
            </div>

            <div className="p-actions">
              <button className="follow-btn">Follow</button>
              <button className="edit-btn">shear Profile</button>
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
              
              {console.log(userposts)}
                {console.log("isArray =", Array.isArray(userposts))}
                {userposts.map(post => (
                <div key={post._id} style={{ color: "white"}}>
                  <div className="peoplepost-card">
                  <div style={{display:"flex",gap:"10%"}}><h4 style={{color:"rgba(37, 245, 22, 0.47)"}}>{post.company}</h4><p>{post.result}</p></div><br/>
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
                      <h3 style={{color:"black", fontFamily:"Times"}}>Questions</h3>
                      <p style={{color:"black",font:"Times",fontWeight:"bolder"}}>{selectedPost.askedqutns}</p>
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
    
    </>
  );
}

export default PeopleProfile;
