import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const nav = useNavigate();

  return (
    <header>
      <h1 style={{ fontSize: "30px",fontFamily:"Times" }}>InterviewXP</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/posts">Experiences</Link>
        <Link to="/rooms">Chat-Rooms</Link>

        {localStorage.getItem("username") ? (
          <button
            onClick={() => nav("/profile")}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "2px solid white",
              background: "linear-gradient(160deg, #020116 0%, #221e68cb 45%, #0b0686cd 90%)",
              color: "#fbfbfb",
              fontSize: "20px",
              fontWeight: "bold",
              margin: "10px",
              cursor: "pointer"
            }}
          >
            {localStorage.getItem("username")[0].toUpperCase()}
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
