import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const nav=useNavigate();
  return (
    <>
      <header>
        <h1 style={{fontSize:"50px"}}>InterviewXP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/posts">Experiences</a>
          <a href="/crtpost">Prepare</a>
          <a href="/login">Login</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h2>
            Crack Interviews with <span>Real Experiences</span>
          </h2>
          <p>
            Learn from real interview experiences shared by candidates from top
            companies. Prepare smarter, not harder.
          </p>
          <button onClick={()=>{
            nav("/posts")
          }}>Explore Experiences</button>
        </div>

        <div className="hero-image">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Interview Illustration"
          />
        </div>
      </section>

      <section className="features">
        <h2>Why Choose InterviewXP?</h2>

        <div className="feature-grid">
          <div className="card">
            <h3>Real Interview Questions</h3>
            <p>Actual questions asked in technical, HR, and managerial rounds.</p>
          </div>

          <div className="card">
            <h3>Company-wise Prep</h3>
            <p>Filter interview experiences by company, role, and difficulty.</p>
          </div>

          <div className="card">
            <h3>Structured Rounds</h3>
            <p>Understand each interview round clearly with tips and outcomes.</p>
          </div>

          <div className="card">
            <h3>Community Driven</h3>
            <p>Share your experience and help thousands of candidates.</p>
          </div>
        </div>
      </section>

      <footer>
        © 2026 InterviewXP. Built with ❤️ by Abhishek.
      </footer>
    </>
  );
}

export default Home;
