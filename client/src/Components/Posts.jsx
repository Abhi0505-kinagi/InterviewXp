import "./Posts.css";

function Posts() {
  const experiences = [
    {
      company: "Google",
      role: "Software Engineer",
      level: "Fresher",
      rounds: "Online Test, Technical, HR",
      experience:
        "Questions were mostly DSA and problem solving. Interviewers were friendly. Focus on arrays, strings, and trees."
    },
    {
      company: "Microsoft",
      role: "SDE Intern",
      level: "Intern",
      rounds: "Coding Round, Technical Interview",
      experience:
        "Coding round was medium level. Technical interview focused on projects and OOP concepts."
    }
  ];

  return (
    <div className="posts-container">
      <h2>Interview Experiences</h2>

      {experiences.map((post, index) => (
        <div className="post-card" key={index}>
          <div className="post-header">
            <h3>{post.company}</h3>
            <span>{post.role} • {post.level}</span>
          </div>

          <p className="rounds">
            <strong>Rounds:</strong> {post.rounds}
          </p>

          <p className="experience">
            {post.experience}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
