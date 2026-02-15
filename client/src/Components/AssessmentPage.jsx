import Navbar from "./Navbar";
import { useParams,useNavigate } from "react-router-dom";

function Assessment() {
  const { examId } = useParams();
  const nav=useNavigate();
  return (
    <>
      <Navbar />
      <h1 style={{textAlign:"center",fontFamily:"Times"}}>Page is Under active development</h1>
      <h1 style={{textAlign:"center",fontFamily:"Times"}}>503 -Service Unavailable</h1>
      <div style={{height:"20vh",display: "flex",justifyContent: "center",alignItems: "center"}}>
        <button style={{backgroundColor:"red",padding:"5px",border:"none",borderRadius:"10px",width:"79px",height:"30px"}} onClick={()=>{
          nav("/")
        }}>Back</button>
      </div>

    </>
  );
}

export default Assessment;