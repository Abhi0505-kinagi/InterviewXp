import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

function Assessment() {
  const { examId } = useParams();

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      color: "#fff",
      fontFamily: "Times, serif",
    },
    header: {
      borderBottom: "2px solid #00ffb9",
      paddingBottom: "10px",
      marginBottom: "30px",
      textAlign: "center",
    },
    section: {
      background: "rgba(15, 23, 41, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
      border: "1px solid #333",
    },
    title: {
      color: "#00ffb9",
      fontSize: "22px",
      marginBottom: "15px",
    },
    list: {
      lineHeight: "1.8",
      fontSize: "16px",
    },
    warning: {
      color: "#ff4d4d",
      fontWeight: "bold",
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Virtual Assessment Center</h1>
          <p>Exam ID: <span style={{ color: "#00ffb9" }}>{examId}</span></p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.title}>🛡️ Privacy & Safety Measures</h2>
          <ul style={styles.list}>
            <li><strong>Data Encryption:</strong> All video and audio streams during the assessment are end-to-end encrypted.</li>
            <li><strong>Identity Verification:</strong> Your data is used solely for verification purposes and is not shared with third parties.</li>
            <li><strong>Recording Notice:</strong> If the session is recorded for evaluation, you will be notified explicitly before the start.</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.title}>⚖️ Ethical Guidelines</h2>
          <ul style={styles.list}>
            <li><strong>Fairness:</strong> We ensure an unbiased environment for all candidates regardless of their background.</li>
            <li><strong>Integrity:</strong> Candidates are expected to provide honest responses reflecting their own skills and experiences.</li>
            <li><strong>Professionalism:</strong> Maintain a professional decorum throughout the virtual interaction.</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.title}>🚫 Anti-Malpractice Policy</h2>
          <p style={styles.warning}>To ensure a level playing field, the following are strictly prohibited:</p>
          <ul style={styles.list}>
            <li><strong>Plagiarism:</strong> Using external resources, AI tools, or pre-written scripts during the live assessment.</li>
            <li><strong>Screen Monitoring:</strong> Multiple tabs, screen sharing, or external recording devices are detected by our system.</li>
            <li><strong>Impersonation:</strong> Any attempt to have another individual take the assessment on your behalf will lead to immediate disqualification.</li>
            <li><strong>Environment:</strong> Ensure you are in a quiet, well-lit room alone. Detection of other individuals may flag the session.</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button 
            style={{
              padding: "12px 30px",
              fontSize: "18px",
              backgroundColor: "#00ffb9",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
            onClick={() => alert("Assessment environment is being prepared...")}
          >
            I Agree & Start Assessment
          </button>
        </div>
      </div>
    </>
  );
}

export default Assessment;