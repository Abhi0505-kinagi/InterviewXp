

function PostExperience() {
  return (
    <div className="post-container">
      <h2>Share Your Interview Experience</h2>
      <p className="subtitle">
        Help others by sharing what you faced in the interview
      </p>

      <form className="post-form">
        {/* Company Name */}
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" placeholder="e.g. Google" />
        </div>

        {/* Experience Level */}
        <div className="form-group">
          <label>Experience Level</label>
          <select>
            <option value="">Select</option>
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        {/* Interview Rounds */}
        <div className="form-group">
          <label>Interview Rounds</label>
          <textarea
            rows="6"
            placeholder={`Example:
Round 1: Online Coding Test
Round 2: Technical Interview
Round 3: HR Round`}
          />
        </div>

        {/* Questions Asked */}
        <div className="form-group">
          <label>Questions Asked</label>
          <textarea
            rows="6"
            placeholder="List technical / HR questions you were asked"
          />
        </div>

        {/* Your Experience */}
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
