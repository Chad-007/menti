import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId.trim() || !username.trim()) {
      alert("Please enter both a Room ID and a Username.");
      return;
    }
    navigate(`/room/${roomId}?admin=false`, {
      state: { username },
    });
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#121212',
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    width: '320px',
  };

  const headingStyle = {
    color: '#E0E0E0',
    fontSize: '3.5rem',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: '0.2rem',
    marginBottom: '20px',
  };

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #444',
    color: '#fff',
    fontSize: '1.1rem',
    padding: '10px 5px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
     borderBottom: '1px solid #fff',
  };
  
  const buttonStyle = {
    background: '#252525',
    color: '#E0E0E0',
    border: '1px solid #444',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1rem',
    cursor: 'pointer',
    transition: 'background 0.3s ease, color 0.3s ease',
    marginTop: '20px',
  };

  const buttonHoverStyle = {
    background: '#fff',
    color: '#121212',
  };

  return (
    <div style={pageStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Join Room</h2>
        <input
          placeholder="Enter Room ID"
          style={inputStyle}
          onFocus={e => e.target.style.borderBottom = inputFocusStyle.borderBottom}
          onBlur={e => e.target.style.borderBottom = inputStyle.borderBottom}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          placeholder="Enter Username"
          style={inputStyle}
          onFocus={e => e.target.style.borderBottom = inputFocusStyle.borderBottom}
          onBlur={e => e.target.style.borderBottom = inputStyle.borderBottom}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          style={{ ...buttonStyle, ...(isHovered ? buttonHoverStyle : null) }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
}