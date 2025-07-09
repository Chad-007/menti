  import { useEffect, useState } from "react";
  import { useParams, useSearchParams, useLocation } from "react-router-dom";

  export default function Room() {
    const { id } = useParams();
    const [params] = useSearchParams();
    const location = useLocation();
    const isAdmin = params.get("admin") === "true";

    const [current, setCurrent] = useState(null);
    const [ws, setWs] = useState(null);
    const [hoveredOption, setHoveredOption] = useState(null);
    const [isControlHovered, setIsControlHovered] = useState(false);

    useEffect(() => {
      const username = location.state?.username || "Anonymous";
      const socket = new WebSocket("ws://localhost:4000");
      socket.onopen = () => {
        socket.send(JSON.stringify({
          type: "join",
          roomId: id,
          admin: isAdmin,
          username, 
          questions: isAdmin ? location.state?.questions ?? [] : undefined,
        }));
      };

      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.type === "question") {
          setCurrent(data.question);
        } else if (data.type === "end") {
          alert(`🏆 Winner: ${data.winner} with ${data.score} points`);
        }
      };

      setWs(socket);
      return () => socket.close();
    }, [id, isAdmin, location.state]);

    const sendAnswer = (opt) => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "answer", option: opt }));
        setCurrent(null); 
      }
    };

    const nextQuestion = () => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "next" }));
      }
    };

    const pageStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#121212',
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      color: '#E0E0E0',
    };

    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: '#1A1A1A',
      padding: '40px',
      borderRadius: '8px',
      border: '1px solid #252525',
      minWidth: '500px',
      minHeight: '400px',
      justifyContent: 'space-between',
    };

    const headerStyle = {
      fontSize: '2rem',
      fontWeight: '500',
      color: '#aaa',
      width: '100%',
    };
    
    const adminTagStyle = {
      color: '#4CAF50', 
      fontWeight: 'bold',
      marginLeft: '8px',
    };

    const statusTextStyle = {
      fontSize: '1.5rem',
      color: '#888',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    };
    
    const questionTextStyle = {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '30px',
    };
    
    const adminAnswerStyle = {
      color: '#FFC107', 
      fontSize: '1.1rem',
      marginBottom: '30px',
    };

    const optionsGridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      width: '100%',
    };
    
    const optionButtonStyle = {
      background: 'transparent',
      border: '1px solid #444',
      color: '#E0E0E0',
      padding: '20px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    };

    const optionButtonHoverStyle = {
      background: '#333',
      borderColor: '#666',
    };
    
    const controlButtonStyle = {
      background: '#252525',
      color: '#E0E0E0',
      border: '1px solid #444',
      padding: '14px 50px',
      fontSize: '1rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.1rem',
      cursor: 'pointer',
      transition: 'background 0.3s ease, color 0.3s ease',
      marginTop: '40px',
      width: '100%',
    };
    
    const controlButtonHoverStyle = {
      background: '#fff',
      color: '#121212',
    };

    return (
      <div style={pageStyle}>
        <div style={containerStyle}>
          <h2 style={headerStyle}>
            Room: {id}
            {isAdmin && <span style={adminTagStyle}>(Admin)</span>}
          </h2>

          {current ? (
            <div>
              <h3 style={questionTextStyle}>{current.question}</h3>
              {isAdmin && <p style={adminAnswerStyle}>Correct Answer: <strong>{current.answer}</strong></p>}
              
              {!isAdmin && (
                <div style={optionsGridStyle}>
                  {current.options.map((opt, i) => (
                    <button
                      key={i}
                      style={{ ...optionButtonStyle, ...(hoveredOption === i ? optionButtonHoverStyle : null) }}
                      onMouseEnter={() => setHoveredOption(i)}
                      onMouseLeave={() => setHoveredOption(null)}
                      onClick={() => sendAnswer(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p style={statusTextStyle}>Waiting for question...</p>
          )}

          {isAdmin && (
            <button
              style={{ ...controlButtonStyle, ...(isControlHovered ? controlButtonHoverStyle : null) }}
              onMouseEnter={() => setIsControlHovered(true)}
              onMouseLeave={() => setIsControlHovered(false)}
              onClick={nextQuestion}
            >
              {current ? "Next Question" : "Start Game"}
            </button>
          )}
        </div>
      </div>
    );
  }