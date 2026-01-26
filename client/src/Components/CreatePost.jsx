import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
function PostExperience() {
  // BASIC FIELDS
  const nav=useNavigate();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("Public");
  const [tips, setTips] = useState("");
  const [tags, setTags] = useState("");
  const [askedqutns, setAskedqutns] = useState("");

  // ROUNDS
  const [roundCount, setRoundCount] = useState(0);
  const [rounds, setRounds] = useState([]);

  // HANDLE NUMBER OF ROUNDS
  const handleRoundCount = (count) => {
    setRoundCount(count);

    const temp = Array.from({ length: count }, (_) => ({
      roundname:"",
      questions: "",
      description: ""
    }));

    setRounds(temp);
  };

  // HANDLE ROUND INPUT CHANGE
  const handleRoundChange = (index, field, value) => {
    const updatedRounds = [...rounds];
    updatedRounds[index][field] = value;
    setRounds(updatedRounds);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!company || !role || !experienceLevel || !difficulty || !result || !askedqutns) {
      toast.error("Please fill all required fields!");
      return;
    }

    const invalidRound = rounds.find(r => !r.questions.trim());
    if (invalidRound) {
      toast.error("Please add questions for all rounds!");
      return;
    }

    const payload = {
      userId: localStorage.getItem("userId") || "demo-user",
      company,
      role,
      experienceLevel,
      difficulty,
      result,
      status,
      tips,
      askedqutns,
      rounds,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
    };
    //console.log("FINAL PAYLOAD 👇", payload);
    try {
      const res = await fetch("http://localhost:5000/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok){
        toast.error("Failed to post experience, veiw console for more info");
        throw new Error(data.message || "Failed to post experience");
        
      } 

      toast.success("Experience posted successfully!");

      // Reset form
      setCompany("");
      setRole("");
      setExperienceLevel("");
      setDifficulty("");
      setResult("");
      setStatus("Public");
      setTips("");
      setTags("");
      setAskedqutns("");
      setRoundCount(0);
      setRounds([]);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <Navbar />

      <div className="xp-page">
        <div className="xp-card">
          <button style={{backgroundColor:"transparent",fontFamily:"Times",fontSize:"16px",border:"none",cursor:"pointer"}} onClick={()=>{
            nav("/profile")
          }}>◀◀ back</button>
          <h2>Share Your Interview Experience</h2>
          <p className="xp-subtitle">
            Your experience can guide thousands of candidates
          </p>

          <form onSubmit={handleSubmit}>
            <div className="xp-grid">

              {/* LEFT COLUMN */}
              <div className="xp-left">

                <div className="xp-field">
                  <label>Company</label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Google"
                  />
                </div>

                <div className="xp-field">
                  <label>Role</label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="xp-field">
                  <label>Experience Level</label>
                  <select onChange={(e) => setExperienceLevel(e.target.value)}>
                    <option value="">Select</option>
                    <option>Fresher</option>
                    <option>Intern</option>
                    <option>Junior</option>
                    <option>Mid</option>
                    <option>Senior</option>
                  </select>
                </div>

                <div className="xp-field">
                  <label>Difficulty</label>
                  <select onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="">Select</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div className="xp-field">
                  <label>Result</label>
                  <select onChange={(e) => setResult(e.target.value)}>
                    <option value="">Select</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div className="xp-field">
                  <label>Visibility</label>
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option>Public</option>
                    <option>Private</option>
                    <option>Draft</option>
                  </select>
                </div>

                <button type="submit" className="xp-btn" onClick={()=>{
                }}>
                  Post Experience
                </button>
              </div>

              {/* RIGHT COLUMN */}
              <div className="xp-right">

                <div className="xp-field">
                  <label>Overall Questions Asked</label>
                  <textarea
                    rows="4"
                    value={askedqutns}
                    onChange={(e) => setAskedqutns(e.target.value)}
                  />
                </div>

                <div className="xp-field">
                  <label>Number of Rounds</label>
                  <select onChange={(e) => handleRoundCount(Number(e.target.value))}>
                    <option value="0">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                {/* DYNAMIC ROUNDS */}
                {rounds.map((round, index) => (
                  <div key={index} className="xp-round-card">
                     <div className="xp-field">
                      <div style={{display:"flex",gap:"10%"}}><label>Round Name</label>
                      <input
                        rows="3"
                        value={round.name}
                        onChange={(e) =>
                          handleRoundChange(index, "roundName", e.target.value)
                        }
                      />
                    </div></div>
                    <div className="xp-field">
                      <label>Questions Asked</label>
                      <textarea
                        rows="3"
                        value={round.questions}
                        onChange={(e) =>
                          handleRoundChange(index, "questions", e.target.value)
                        }
                      />
                    </div>

                    <div className="xp-field">
                      <label>Description</label>
                      <textarea
                        rows="2"
                        value={round.description}
                        onChange={(e) =>
                          handleRoundChange(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <h3 style={{fontFamily:"Times"}}>Help Others</h3>
                <fieldset style={{border:"2px solid #00ffb9",padding:"10px",borderRadius:"10px"}}>
                  <div className="xp-field">
                  <label>Tips for Candidates</label>
                  <textarea
                    rows="3"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                  />
                </div>

                <div className="xp-field">
                  <label>Tags</label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="DSA, React, HR"
                  />
                </div>

                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostExperience;
