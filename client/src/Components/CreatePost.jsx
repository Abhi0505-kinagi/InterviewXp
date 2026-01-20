function PostExperience() {
  return (
    <div className="post-container">
      <h2>Share Your Interview Experience</h2>
      <p className="subtitle">
        Help others by sharing what you faced in the interview
      </p>

      <form className="post-form">

        {/* Company */}
        <div className="form-group">
          <label>Company</label>
          <input type="text" placeholder="Google" required />
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>
          <input type="text" placeholder="Software Engineer" required />
        </div>

        {/* Experience Level */}
        <div className="form-group">
          <label>Experience Level</label>
          <select required>
            <option value="">Select</option>
            <option>Fresher</option>
            <option>Intern</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
        </div>

        {/* Interview Rounds */}
        <div className="form-group">
          <label>Interview Rounds</label>
          <textarea
            rows="5"
            placeholder={`Round 1: Online Test - DSA questions
Round 2: Technical Interview - OOPS, DBMS
Round 3: HR Round`}
          />
        </div>

        {/* Difficulty */}
        <div className="form-group">
          <label>Difficulty</label>
          <select required>
            <option value="">Select</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* Result */}
        <div className="form-group">
          <label>Result</label>
          <select required>
            <option value="">Select</option>
            <option>Selected</option>
            <option>Rejected</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Tips */}
        <div className="form-group">
          <label>Tips for Candidates</label>
          <textarea
            rows="4"
            placeholder="Revise DSA, practice system design..."
          />
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            placeholder="DSA, React, HR (comma separated)"
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Visibility</label>
          <select>
            <option>Public</option>
            <option>Private</option>
            <option>Draft</option>
          </select>
        </div>

        <button type="submit">Post Experience</button>
      </form>
    </div>
  );
}

export default PostExperience;
