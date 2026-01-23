import "./CreatePost.css";

function PostExperience() {
  return (
    <>
      {/* HEADER */}
      <header className="xp-header">
        <h1>InterviewXP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/posts">Experiences</a>
          <a href="/profile">Prepare</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      {/* PAGE */}
      <div className="xp-page">
        <div className="xp-card">
          <h2>Share Your Interview Experience</h2>
          <p className="xp-subtitle">
            Help others by sharing what you faced in the interview
          </p>

          <form>
            <div className="xp-grid">

              {/* LEFT COLUMN — SELECTION */}
              <div className="xp-left">
                <div className="xp-field">
                  <label>Company</label>
                  <input type="text" placeholder="Google" />
                </div>

                <div className="xp-field">
                  <label>Role</label>
                  <input type="text" placeholder="Software Engineer" />
                </div>

                <div className="xp-field">
                  <label>Experience Level</label>
                  <select>
                    <option>Select</option>
                    <option>Fresher</option>
                    <option>Intern</option>
                    <option>Junior</option>
                    <option>Mid</option>
                    <option>Senior</option>
                  </select>
                </div>

                <div className="xp-field">
                  <label>Difficulty</label>
                  <select>
                    <option>Select</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="xp-field">
                  <label>Result</label>
                  <select>
                    <option>Select</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div className="xp-field">
                  <label>Visibility</label>
                  <select>
                    <option>Public</option>
                    <option>Private</option>
                    <option>Draft</option>
                  </select>
                </div>

                <button type="submit" className="xp-btn">
                  Post Experience
                </button>
              </div>

              {/* RIGHT COLUMN — DESCRIPTIVE */}
              <div className="xp-right">
                <div className="xp-field">
                  <label>Interview Rounds</label>
                  <textarea rows="5" />
                </div>

                <div className="xp-field">
                  <label>Questions Faced</label>
                  <textarea rows="6" />
                </div>

                <div className="xp-field">
                  <label>Tips for Candidates</label>
                  <textarea rows="4" />
                </div>

                <div className="xp-field">
                  <label>Tags</label>
                  <input placeholder="DSA, React, HR" />
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostExperience;
