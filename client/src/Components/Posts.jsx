import "./Posts.css";
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
