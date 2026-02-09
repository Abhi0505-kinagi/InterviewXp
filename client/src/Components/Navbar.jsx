import "./Home.css"
import { useNavigate } from "react-router-dom";
function Navbar(){
    const nav=useNavigate();
    return(
        <>
        <header>
        <h1 style={{fontSize:"30px"}}>InterviewXP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/posts">Experiences</a>
          <a href="/virtual/assessments/:examId">Assessment</a>
          <a href="/rooms">Chat-Rooms</a>
          {localStorage.getItem("username") ? (
            <button 
              onClick={() => {
                //localStorage.removeItem("userId");
                //localStorage.removeItem("username")
                //window.location.href = "/";
                nav("/profile")
              }}
              style={{ 
                display: 'inline-block', 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%',
                border:"2px solid white", 
                background: '#0f3370', 
                color: '#fbfbfb', 
                textAlign: 'center', 
                lineHeight: '30px', 
                fontWeight: 'bold',
                fontSize:"20px",
                fontFamily:"Times",
                margin:"10px",
                cursor: 'pointer'
              }}
              
            >
              {localStorage.getItem("username")[0].toUpperCase()}
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
      </header>
        </>
    )
}
export default Navbar;