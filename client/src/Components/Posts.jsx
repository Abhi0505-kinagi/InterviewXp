import "./Posts.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import likeimg from "../assets/like_14263529.png";
import likeimg2 from "../assets/like_11441338.png";
import cmntimg from "../assets/message_5356248.png";
import PeopleProfile from "./PeopleProfile";
import Navbar from "./Navbar";
/* -------------------- Card Component -------------------- */
function Card({ exp,interviewId}) {
  const [liked, setLiked] = useState(false);
  const nav=useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [cmnt,setcmnting]=useState(false);
  const [cmnttext,setcmnttext]=useState("");
  const [comments, setComments] = useState([]);
  const postComment = async () => {
        if (!cmnttext.trim()) return;
        try {
          const res = await fetch(
            `http://localhost:5000/api/interviews/${interviewId}/comment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cmntText: cmnttext,
                userId: "696ca4df287aab11f81fb793" // TEMP user id
              }),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            alert(data.message || "Failed to comment");
            return;
          }
          setComments(prev => [data.comment, ...prev]);
          setcmnttext("");
          setcmnting(false);

        } catch (err) {
          console.error(err);
        }
      };


  useEffect(() => {
  fetch(`http://localhost:5000/api/interviews/${interviewId}/comment`)
    .then(res => res.json())
    .then(data => setComments(data))
    .catch(err =>{
      console.log(err);
    })
    }, [interviewId]);


  return (
    <>
    <div className="card fade-in" style={{ position: "relative" }}>
      <div style={{display:"flex", gap:"30%"}}><h3 style={{fontFamily:"Times",color:"#869DAD"}}>{(exp.userId?.name).toUpperCase()}</h3><button style={{width:"60px", height:"25px",fontFamily:"Times",backgroundColor:"transparent",borderRadius:"5px",margin:"5px",border:"1px solid white"}}>follow</button></div>
      <button style={{fontSize:"13px",backgroundColor:"transparent",border:"none",padding:0,color: "#10edf5",cursor: "pointer",textAlign: "left",width: "fit-content"}} onClick={()=>{
        nav(`/userprofls/${exp.userId?.name}`)
      }}>see profile</button>
      <h3 style={{fontFamily:"Times",color:"#976de3"}}>{exp.company}</h3>
      <div style={{ fontFamily: 'Times', lineHeight: '1.6', color: '#f2e6e6',margin:"5px"}}>
        <p style={{fontFamily:"Times",paddingTop:"20px"}}>
          <strong>Level:</strong> {exp.experienceLevel}<br /><br/>
          <strong>Difficulty:</strong> {exp.difficulty}<br /><br/>
          <strong>Result:</strong> {exp.result}<br /><br/>
          <strong>Posted on:</strong> {new Date(exp.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
          <br/>
        <p>
          <strong>Rounds:</strong> {exp.rounds.length}
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
        <button onClick={()=>{
          setOpen(true);
          setSelectedExp(exp);
        }} style={{height:"10%",width:"90%",backgroundColor:"transparent",margin:"10px",border:"5px",borderRadius:"5px",cursor:"pointer"}}>Read More ▶▶</button>
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
        <button
          onClick={() => setLiked(!liked)}
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <img
            src={liked ? likeimg2 : likeimg}
            alt="Like"
            style={{ height: "30px", width: "30px" }}
          />
          <span>{exp.upvotes.length}</span>
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
          <div className="overlay">
            <div
              className="display-card"
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
              <h1 style={{color:"#361377"}}>{exp.company}</h1>
              <p style={{color:"black",fontFamily:"Times"}}><span style={{color:"black",fontFamily:"Times"}}>Experience Level:</span>{exp.experienceLevel}</p>
              <p><span style={{color:"black",fontFamily:"Times"}}>Difficulty Level:</span><strong
                style={{
                  color:
                    exp.difficulty === "Hard"
                      ? "#be0620"
                      : exp.difficulty === "Medium"
                      ? "orange"
                      : "green",
                  fontFamily: "Times",
                }}
              >{exp.difficulty}
              </strong></p>

              <p style={{color:"black",fontFamily:"Times"}}>Number of Rounds {exp.rounds.length}</p>
             <p>Topics</p>
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
              <p><span style={{color:"black",fontFamily:"Times"}}>Tips : </span><span style={{color:"#16601c",fontFamily:"Times"}}>{exp.tips}</span></p>
              <p style={{color:"rgb(22, 10, 34)",fontFamily:"Times"}}>Round Descriptions:</p>
              {Array.isArray(exp.rounds) && exp.rounds.map((round) => (
                <div key={round._id} className="round-card">
                  <h3 style={{color:"black",fontFamily:"Times",fontSize:"15px"}}>{round.roundName}</h3>
                  <p  style={{color:"black",fontFamily:"Times",fontSize:"17px",marginLeft:"10px"}}>●Question: {round.questions} <p  style={{color:"black",fontFamily:"Times",fontSize:"12px",marginLeft:"10px"}}>Description: {round.description}</p></p>
                 
                </div>
              ))}<br/>
              <h3 style={{color:"black", fontFamily:"Times"}}>Questions</h3>
              <p style={{color:"black",font:"Times"}}>{exp.askedqutns}</p>
              posted by
              <p style={{bottom:"5px",color:"#0f0a17",fontFamily:"Times"}}>▶▶{exp.userId?.name}</p><br/>
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
        {/*----------------------------------*/}
        {cmnt && (
          <div className="overlay-cmt">
            <div
              className="display-cmt-card"
              onClick={(e) => e.stopPropagation()}
            >
              
              <button style={{ float: "right",backgroundColor:"transparent",color:"#db0f2e",fontFamily:"Times",border:"2px",fontSize:"20px" }} onClick={() => setcmnting(false)}>❌</button>
              <button  onClick={postComment} disabled={cmnttext.trim() === ""}
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

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/interviews?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setInterviews(data.interviews);
        setTotal(data.total);
        setLoading(false);
        console.log(data.interviews);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

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
      <div style={{ padding: "5px" }}>
        <h3>
          The <strong style={{ color: "green" }}>Community & Growth</strong>{" "}
          Approach — Real stories, real questions, real advice.
        </h3>
      </div>

      <div className="page">
        <div className="cards-grid">
          {console.log(interviews)}
          {loading && <p>Loading...</p>}
          {!loading && Array.isArray(interviews) && interviews.map(exp => (
          <Card key={exp._id} exp={exp} interviewId={exp._id} />
        ))}

        </div>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
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

/*import "./Posts.css";
import { useState } from "react";
import likeimg from "../assets/like_14263529.png";
import likeimg2 from "../assets/like_11441338.png";
import cmntimg from "../assets/message_5356248.png";

// Single Card component
function Card({ header }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card fade-in" style={{ position: "relative" }}>
      <div>{header}</div>
      <div style={{ flexGrow: 1 }}></div>
      <div>
        {
          {
          }
        }
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          position: "absolute",
          bottom: "10px",
        }}
      >
        <button
          onClick={() => setLiked(!liked)}
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <img
            src={liked ? likeimg2 : likeimg}
            alt={liked ? "Liked" : "Like"}
            style={{ height: "30px", width: "30px" }}
          />
        </button>
        <button
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <img
            src={cmntimg}
            alt="Comment"
            style={{ height: "30px", width: "30px" }}
          />
        </button>
      </div>
    </div>
  );
}

function Posts() {
  const cardsPerPage = 4;
  const totalCards = 20; // total cards available
  const [page, setPage] = useState(0); // current page index

  // Generate current page cards dynamically
  const currentCards = [];
  const start = page * cardsPerPage + 1;
  const end = Math.min(start + cardsPerPage, totalCards + 1);
  for (let i = start; i < end; i++) {
    currentCards.push(`Card ${i}`);
  }

  const handleNext = () => {
    if (end <= totalCards) setPage(page + 1);
  };

  const handleBack = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <>
        <header>
        <h1 style={{fontSize:"30px"}}>InterviewXP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/posts">Experiences</a>
          <a href="/profile">Prepare</a>
          <a href="/login">Login</a>
        </nav>
      </header>
      <div style={{ padding: "5px" }}>
        <h3>
          The <strong style={{ color: "green" }}>Community & Growth</strong>{" "}
          Approach From campus preparation to corporate offers, Unlocking the
          secrets behind the hiring process. Real stories, real questions, and
          real advice— Because the best way to succeed is to learn together.
        </h3>
      </div>

      <div className="page">
        <div className="cards-grid">
          {currentCards.map((header, index) => (
            <Card key={index} header={header} />
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "1px 0" }}>
          {page > 0 && (
            <button onClick={handleBack} className="load-button">
              Back
            </button>
          )}
          {end <= totalCards && (
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
  
*/