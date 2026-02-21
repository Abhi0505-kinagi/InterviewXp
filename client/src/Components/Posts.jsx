import "./Posts.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import likeimg from "../assets/like_13466143.png";
import likeimg2 from "../assets/like_11441338.png";
import cmntimg from "../assets/message_5356248.png";
import PeopleProfile from "./PeopleProfile";
import dislike from "../assets/dislike_13466043.png"
import Navbar from "./Navbar";
import { getSentiment, getSelection } from "../services/mlServices";
/* -------------------- Card Component -------------------- */
function Card({ exp,interviewId}) {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(exp.upvotes.includes(localStorage.getItem("userId")));
  const [disliked, setDisliked] = useState(exp.downvotes.includes(localStorage.getItem("userId")));
  const [upvotes, setUpvotes] = useState(exp.upvotes.length);
  const [downvotes, setDownvotes] = useState(exp.downvotes.length);
  const nav=useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [cmnt,setcmnting]=useState(false);
  const [cmnttext,setcmnttext]=useState("");
  const [comments, setComments] = useState([]);
  const currentUserId = localStorage.getItem("userId"); // Logged-in user ID
  const username = exp.userId?.username; // Target user's username
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(exp.userId?.followers?.length || 0);
  const postComment = async () => {
        if (!cmnttext.trim()) {
          toast.error("Invalid input. Please review and try again")
          return;
        }

        try {
          const res = await fetch(
            `${BACKEND_URL}/api/interviews/${exp._id}/comment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cmntText: cmnttext,
                userId: localStorage.getItem("userId")
              }),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            setTimeout(()=>{
              toast.error("Failed to comment "+data.message);
            },1000)
            return;
          }
          if(res.ok){
            setTimeout(()=>{
              toast.success("comment posted successfully")
            },2000)
          }
          setComments(prev => [data.comment, ...prev]);
          setcmnttext("");
          setcmnting(false);

        } catch (err) {
          toast.error("Unable to complete the request."+err);
        }
      };


  useEffect(() => {
      fetch(`${BACKEND_URL}/api/interviews/${interviewId}/comment`)
        .then(res => res.json())
        .then(data => setComments(data))
        .catch(err =>{
          toast.error("Error occured:"+err);
        })
        }, [interviewId]);
    const userId=localStorage.getItem("userId");
    const handleLike = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/interviews/${exp._id}/upvote`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }
        );
        const data = await res.json();

        if (res.ok) {
          setLiked(!liked);
          setDisliked(false);
          setUpvotes(data.upvotes);
          setDownvotes(data.downvotes);
        }
      } catch (err) {
        toast.error("Unable to complete the request."+err);
      }
    };
    const handleDislike = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/interviews/${exp._id}/downvote`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setDisliked(!disliked);
          setLiked(false);
          setUpvotes(data.upvotes);
          setDownvotes(data.downvotes);
        }
      } catch (err) {
        toast.error("Unable to complete the request."+err);
      }
    };
  useEffect(() => {
    // Check if current user is already following
    if (exp.userId?.followers?.includes(currentUserId)) {
      setIsFollowing(true);
    }
  }, [exp.userId?.followers, currentUserId]);

  const handleFollow = async () => {
    try {
      const endpoint = isFollowing ? "unfollow" : "follow";
      const res = await fetch(`${BACKEND_URL}/api/profile/${exp.userId?.name}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setIsFollowing(!isFollowing);
      setFollowersCount(data.followersCount);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };
  useEffect(() => {
  const checkFollow = async () => {
    const res = await fetch(
      `${BACKEND_URL}/api/profile/${exp.userId?.name}/is-following/${currentUserId}`
    );
    const data = await res.json();
    setIsFollowing(data.isFollowing);
  };

  if (exp.userId?.name && currentUserId) {
    checkFollow();
  }
}, [exp.userId?.name, currentUserId]);
  //for ml model fetching data
  const fetchAiSummary = async (text) => {
      try {
        setLoading(true);
        const [sentimentRes, selectionRes] = await Promise.all([
          getSentiment(text),
          getSelection(text)
        ]);

        const sentimentText = sentimentRes.prediction === 1 ? "Positive" : "Negative";
        const selectionText = selectionRes.prediction === 1 ? "High chance of selection" : "Low chance of selection";
        setAiSummary(
          `Sentiment: ${sentimentText} (Confidence: ${Math.round(sentimentRes.result.result.confidence* 100)}%), Selection: ${selectionText} (Confidence: ${Math.round(selectionRes.result.result.confidence * 100)}%)`
        );
      } catch (err) {
        setAiSummary("AI summary could not be generated.");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    const textToAnalyze = (exp.tips || "") + " " + (exp.askedqutns || "") + " " + (exp.company || "");

    if (open && textToAnalyze.trim()) {
      fetchAiSummary(textToAnalyze); // Call ML when overlay opens
    } else {
      setAiSummary(""); // Clear summary when overlay closes
    }
  }, [open, exp.tips, exp.askedqutns, exp.company]); // use individual dependencies
  const token = localStorage.getItem("token");


  return (
    <>
    <div className="posts-card fade-in" style={{ position: "relative" }}>
      <h3 style={{fontFamily:"Times",color:"#869DAD"}}>{(exp.userId?.displayName).toUpperCase()}</h3><div style={{display:"flex"}}>
        <button style={{fontSize:"13px",backgroundColor:"transparent",border:"none",padding:0,color: "#10edf5",cursor: "pointer",textAlign: "left",width: "fit-content"}} onClick={()=>{
        nav(`/userprofls/${exp.userId?.name}`)
      }}>see profile</button>
        {currentUserId !== exp.userId?._id && <button
        onClick={() => {
          if (!token) {
            toast.error("Please login to continue");
          } else {
            handleFollow();
          }
        }}

        style={{
          width: "80px",
          height: "30px",
          fontFamily: "Times",
          backgroundColor: isFollowing ? "#b5b0b0" : "transparent",
          color: isFollowing ? "#05142e" : "#ffffff",
          borderRadius: "5px",
          margin: "5px",
          border: "1px solid white",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>}
      </div>
      <h3 style={{fontFamily:"Times",color:"#976de3"}}>Company: {exp.company}</h3>
      <br/>
      <div style={{ fontFamily: 'Times'}} className="meta">
          <strong style={{fontFamily:"Times"}}>company Role:</strong> {exp.role}<br/>
          <strong style={{fontFamily:"Times"}}>candidate Level:</strong> {exp.experienceLevel}<br/>
          <strong style={{fontFamily:"Times"}}>Difficulty Level:</strong> <span className={`difficulty ${exp.difficulty.toLowerCase()}`}>{exp.difficulty}</span><br/>
           <strong style={{ fontFamily: "Times" }}>Result: </strong>
              <span
                style={{
                  color:
                    exp.result === "Selected"
                      ? "rgb(17, 236, 68)"
                      : exp.result === "Rejected"
                      ? "red"
                      : exp.result === "Pending"
                      ? "gold"
                      : "black",
                }}
              >
                {exp.result}
              </span>

              <br />

          <strong style={{fontFamily:"Times"}}>Posted on:</strong> {new Date(exp.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
           <p>
          <strong style={{fontFamily:"Times"}}>Interview Rounds:</strong> {exp.rounds.length}
          </p>
      
       

        <div style={{ marginTop: '8px' }}>
          {exp.tags?.map((tag, i) => (
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
        <br/>
        <button onClick={()=>{
          setOpen(true);
          setSelectedExp(exp);
        }} style={{margin:"10px",width:"90%",backgroundColor:"transparent",border:"5px",borderRadius:"5px",cursor:"pointer",color:"white"}}>Read More ▶▶</button>
      </div>
        
      <div
        style={{
          display: "flex",
          gap: "20px",
          position: "absolute",
          bottom: "10px",
          left: "24px",      // ✅ AD
          right: "24px" 
        }}
      >
        {/* LIKE */}
        <button
          onClick={() => {
          if (!token) {
            toast.error("Please login to continue");
            } else {
              handleLike();
            }
          }}
          style={{ background: "transparent", border: "none" }}
        >
          <img
            src={liked ? likeimg2 : likeimg}
            alt="Like"
            style={{ width: "30px" }}
          />
          <span>{upvotes}</span>
        </button>

{/* DISLIKE */}
          <button
            onClick={() => {
              if (!token) {
                toast.error("Please login to continue");
              } else {
                handleDislike();
              }
            }}

            style={{ background: "transparent", border: "none" }}
          >
            <img
              src={disliked ? dislike : dislike}
              alt="Dislike"
              style={{ width: "30px" }}
            />
            <span>{downvotes}</span>
          </button>


        <button
          style={{ background: "transparent", border: "none", padding: 0 }} onClick={()=>{
            setcmnting(true);
          }}
        >
          <img
            src={cmntimg}
            alt="Comment"
            style={{ height: "30px", width: "30px" }}
          />
        </button>
      </div>
    </div>
    {open && (
              <div className="overlay" onClick={() => setOpen(false)}>
                <div className="display-card" onClick={(e) => e.stopPropagation()}>
                  
                  <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

                  <h2 className="title">Interview Experience</h2>
                  <p className="muted">Description...</p>

                  <h1 className="company">{exp.company}</h1>

                  <p className="info">
                    <span>Role:</span> {exp.role}
                  </p>
                  <p className="info">
                    
                    <span>Experience Level:</span> {exp.experienceLevel}
                  </p>

                  <p className="info">
                    <span>Difficulty:</span>
                    <strong
                      className={`difficulty ${exp.difficulty.toLowerCase()}`}
                    >
                      {exp.difficulty}
                    </strong>
                  </p>

                  <p className="info">Number of Rounds: {exp.rounds.length}</p>

                  <p className="muted">Topics:</p>
                  <div className="tags">
                    {exp.tags?.map((tag, i) => (
                      <span key={i} className="tag">#{tag}</span>
                    ))}
                  </div>

                  <p className="tips">
                    <span>Tips:</span> {exp.tips}
                  </p>

                  <p className="muted">Round Descriptions:</p>

                  {Array.isArray(exp.rounds) &&
                    exp.rounds.map((round) => (
                      <div key={round._id} className="round-card">
                        <h3>{round.roundName}</h3>
                        <p style={{fontFamily:"Times"}}>● Question: {round.questions}</p>
                        <p className="round-desc">Description: {round.description}</p>
                      </div>
                    ))}

                  <h3 className="muted">Questions</h3>
                  <p className="content">{exp.askedqutns}</p>

                  <p className="posted">posted by</p>
                  <p className="author">▶▶ {exp.userId?.displayName}</p>

                  <h3 className="ml-title">ML Summarization</h3>

                  <textarea
                    className="ai-box"
                    readOnly
                    value={loading ? "Generating AI summary..." : aiSummary}
                  />

                  <p className="note">
                    <i>
                      Note: We use pretrained ML to enhance content, but all summaries are
                      reviewed by humans for accuracy and quality.
                    </i>
                  </p>

                  <button className="close-footer" onClick={() => setOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}

        {/*----------------------------------*/}
        {cmnt && (
          <div className="overlay-cmt">
            <div
              className="display-cmt-card"
              onClick={(e) => e.stopPropagation()}
            >
              
              <button style={{ float: "right",backgroundColor:"transparent",color:"#db0f2e",fontFamily:"Times",border:"2px",fontSize:"20px" }} onClick={() => setcmnting(false)}>❌</button>
              <button 
                onClick={() => {
                  if (!token) {
                    toast.error("Please login to continue");
                  } else {
                    postComment();
                    toast.info("comment posting..");
                  }
                }}
                disabled={cmnttext.trim() === ""}
              style={{
                position: "absolute",     // position it inside the card
                top: "5%",               // 40% from top of card
                left: "5%",              // center horizontally
                transform: "translate(-50%, -50%)",  // perfect centering
                padding: "8px 20px",
                backgroundColor: "transparent",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontFamily: "Times New Roman, serif",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#2133d2"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#2c2f56"}
            >
              Post
            </button>
            <br/>
              <div>
                <textarea type="text"  placeholder="Write a comment..." value={cmnttext} onChange={(e) => setcmnttext(e.target.value)}
                style={{
                flex: "1",
                padding: "8px",
                borderRadius: "6px",
                width: "90%",
                backgroundColor: "transparent",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                border: "0px",
                outline: "none",
                boxShadow: "none",
              }}/>
                          <div style={{
              width: "80%",
              margin: "20px auto",
              padding: "0",
              boxSizing: "border-box",
            }}>
              <fieldset
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  backgroundColor: "transparent",
                  maxHeight: "300px",    // max height for scroll
                  overflowY: "auto",     // scroll if content exceeds maxHeight
                  boxSizing: "border-box",
                }}
              >
                <legend style={{ padding: "0 8px", fontWeight: "bold", fontSize: "16px" }}>
                  Comments
                </legend>
                 {comments.length === 0 && (
                  <p>No comments yet</p>
                )}

                {comments.map(c => (
                  <div key={c._id} style={{ marginBottom: "10px" }}>
                   <div style={{display:"flex"}}> <strong style={{fontFamily:"Times",color:"red"}}>{c.userId?.name}</strong>
                    <p style={{float:"right",fontSize:"10px",color:"#a89d94"}}>({(() => {
                        const diffMs = new Date() - new Date(c.createdAt);
                        const diffMinutes = Math.floor(diffMs / (1000 * 60));
                        if (diffMinutes < 1) return "Just now";
                        if (diffMinutes < 60) return `${diffMinutes} min ago`;
                        const diffHours = Math.floor(diffMinutes / 60);
                        if (diffHours < 24) return `${diffHours} hr ago`;
                        const diffDays = Math.floor(diffHours / 24);
                        return `${diffDays} day(s) ago`;
                    })()})
                    </p>
                     <p style={{padding:"5px",fontFamily:"Times",color:"#d3d4d1",fontWeight:"100"}}>-{c.cmntText}</p>
                     <br/>
                     </div>
                  </div>
                ))}
              </fieldset>
            </div>

              </div>
            </div>
          </div>
        )}

    </>
  );
}

/* -------------------- Posts Component -------------------- */
function Posts() {
  const limit = 4;
  const [page, setPage] = useState(1);
  const [interviews, setInterviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(search);
      }, 500); // wait 500ms

      return () => {
        clearTimeout(handler);
      };
    }, [search]);
    useEffect(() => {
    if (debouncedSearch.length > 0 && debouncedSearch.length < 2) return;
     setLoading(true);
    const controller = new AbortController();
    const url = debouncedSearch.trim()
      ? `${BACKEND_URL}/api/search-interviews/search?company=${debouncedSearch}&page=${page}&limit=${limit}`
      : `${BACKEND_URL}/api/interviews?page=${page}&limit=${limit}`;
    fetch(url,{ signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setInterviews(data.interviews || data);
        setTotal(data.total || data.length);
        setLoading(false);
      }).catch(err => {
      if (err.name !== "AbortError") {
        setLoading(false);
      }
    });

  return () => controller.abort();

  }, [debouncedSearch,page]);

  const handleNext = () => {
    if ((page * limit) < total) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      
      <Navbar/>
      <div className="posts-page">
        
        <div style={{ padding: "5px" }}>
        <h3>
          The <strong style={{ color: "green" }}>Community & Growth</strong>{" "}
          Approach — Real stories, real questions, real advice.
        </h3>
        <div style={{width:"100%",height:"30px"}}>
          <input placeholder="search by company" style={{color:"rgb(5, 239, 83)",width:"100%",background:"transparent",border:"1px solid white",padding:"5px"}} value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset page when searching
        }} />
        </div>
      </div>
        <div className="cards-grid">
          {loading && <p>Loading...</p>}
          {!loading && Array.isArray(interviews) && interviews.map(exp => (
          <Card key={exp._id} exp={exp} interviewId={exp._id} />
        ))}

        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          {page > 1 && (
            <button onClick={handleBack} className="load-button">
              Back
            </button>
          )}

          {(page* limit) < total && (
            <button
              onClick={handleNext}
              className="load-button"
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Posts;
