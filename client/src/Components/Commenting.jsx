import { useState } from "react";
import cmntimg from "../assets/message_5356248.png"; // your image

function CommentSection() {
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const userName = user?.name || "Anonymous";

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: userName,
      text: commentText,
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };
  const styles = {
    commentBox: {
        marginTop: "10px",
        padding: "10px",
        borderRadius: "8px",
        background: "#f9f9f9",
    },
    inputRow: {
        display: "flex",
        gap: "8px",
        marginBottom: "10px",
    },
    input: {
        flex: 1,
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
    },
    postBtn: {
        padding: "8px 12px",
        borderRadius: "6px",
        border: "none",
        background: "#007bff",
        color: "#fff",
        cursor: "pointer",
    },
    comment: {
        padding: "8px",
        marginBottom: "6px",
        background: "#fff",
        borderRadius: "6px",
        border: "1px solid #eee",
    },
    };


  return (
    <div style={{ marginTop: "15px" }}>
      
      {/* COMMENT BUTTON */}
      <button
        onClick={() => setShowComments(!showComments)}
        style={{ background: "transparent", border: "none", padding: 0 }}
      >
        <img
          src={cmntimg}
          alt="Comment"
          style={{ height: "30px", width: "30px", cursor: "pointer" }}
        />
      </button>

      {/* COMMENT SECTION */}
      {showComments && (
        <div style={styles.commentBox}>

          {/* INPUT */}
          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAddComment} style={styles.postBtn}>
              Post
            </button>
          </div>

          {/* COMMENTS LIST */}
          {comments.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#777" }}>
              No comments yet
            </p>
          ) : (
            comments.map((c) => (
              <div key={c.id} style={styles.comment}>
                <strong>{c.name}</strong>
                <p style={{ margin: "4px 0" }}>{c.text}</p>
              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
}

export default CommentSection;
