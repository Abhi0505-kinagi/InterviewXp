import "./CreatePost.css";

function PostExperience() {
  return (
    <div className="post-container">
      <h2>Share Your Interview Experience</h2>
      <p className="subtitle">
        Help others by sharing what you faced in the interview
      </p>

      <form className="post-form">
        <div className="two-column-layout">

          {/* LEFT COLUMN */}
          <div className="left-column">
            <div className="form-group">
              <label>Company</label>
              <input type="text" placeholder="Google" />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input type="text" placeholder="Software Engineer" />
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <label>Difficulty</label>
              <select>
                <option>Select</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Result</label>
              <select>
                <option>Select</option>
                <option>Selected</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </div>

            <div className="form-group">
              <label>Visibility</label>
              <select>
                <option>Public</option>
                <option>Private</option>
                <option>Draft</option>
              </select>
            </div>

            <button type="submit">Post Experience</button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <div className="form-group">
              <label>Interview Rounds</label>
              <textarea rows="6" />
            </div>

            <div className="form-group">
              <label>Tips for Candidates</label>
              <textarea rows="5" />
            </div>

            <div className="form-group">
              <label>Tags</label>
              <input placeholder="DSA, React, HR" />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default PostExperience;
