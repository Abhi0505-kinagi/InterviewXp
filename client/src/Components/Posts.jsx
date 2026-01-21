import "./Posts.css";
import { useState, useEffect } from "react";
import likeimg from "../assets/like_14263529.png";
import likeimg2 from "../assets/like_11441338.png";
import cmntimg from "../assets/message_5356248.png";

/* -------------------- Card Component -------------------- */
function Card({ exp }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card fade-in" style={{ position: "relative" }}>
      <div style={{display:"flex", gap:"30%"}}><h3 style={{fontFamily:"Times",color:"#869DAD"}}>{(exp.userId?.name).toUpperCase()}</h3><button style={{width:"60px", height:"25px",fontFamily:"Times",backgroundColor:"#022B45",borderRadius:"5px",margin:"5px"}}>follow</button></div>

      <div style={{ fontFamily: 'Times', lineHeight: '1.6', color: '#f2e6e6' }}>
        <p>
          <strong>Level:</strong> {exp.experienceLevel}<br />
          <strong>Difficulty:</strong> {exp.difficulty}<br />
          <strong>Result:</strong> {exp.result}<br />
          <strong>Posted on:</strong> {new Date(exp.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <p>
          <strong>Rounds:</strong> {exp.rounds.length}
        </p>

        <div style={{ marginTop: '8px' }}>
          {exp.tags?.map((tag, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                backgroundColor: '#e0e0e0',
                color: '#333',
                padding: '2px 8px',
                margin: '0 4px 4px 0',
                borderRadius: '4px',
                fontSize: '0.9rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
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
            alt="Like"
            style={{ height: "30px", width: "30px" }}
          />
          <span>{exp.upvotes.length}</span>
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

/* -------------------- Posts Component -------------------- */
function Posts() {
  const limit = 4;
  const [page, setPage] = useState(0);
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
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [page]);

  const handleNext = () => {
    if ((page + 1) * limit < total) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <header>
        <h1 style={{ fontSize: "30px" }}>InterviewXP</h1>
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
          Approach — Real stories, real questions, real advice.
        </h3>
      </div>

      <div className="page">
        <div className="cards-grid">
          {loading && <p>Loading...</p>}

          {!loading && interviews.map(exp => (
            <Card key={exp._id} exp={exp} />
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
          {page > 0 && (
            <button onClick={handleBack} className="load-button">
              Back
            </button>
          )}

          {(page + 1) * limit < total && (
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