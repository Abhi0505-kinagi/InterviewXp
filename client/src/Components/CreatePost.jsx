import "./CreatePost.css";

function PostExperience() {
  return (
    <div className="post-container">
      <h2>Share Your Interview Experience</h2>
      <p className="subtitle">
        Help others by sharing what you faced in the interview
      </p>

      <form className="post-form">
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" placeholder="e.g. Google" />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input type="text" placeholder="e.g. Software Engineer" />
        </div>

        <div className="form-group">
          <label>Experience Level</label>
          <select>
            <option>Fresher</option>
            <option>Intern</option>
            <option>Experienced</option>
          </select>
        </div>

        <div className="form-group">
          <label>Interview Rounds</label>
          <textarea
            rows="6"
            placeholder="Example:
Round 1: Online Coding Test
Round 2: Technical Interview
Round 3: HR Round"
          />
        </div>

        <div className="form-group">
          <label>Questions Asked</label>
          <textarea
            rows="6"
            placeholder="List technical / HR questions you were asked"
          />
        </div>

        <div className="form-group">
          <label>Your Experience</label>
          <textarea
            rows="6"
            placeholder="Share your honest experience, tips, difficulty level..."
          />
        </div>

        <button type="submit">Post Experience</button>
      </form>
    </div>
  );
}

export default PostExperience;
