import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [createHover, setCreateHover] = useState(false);
  const [joinHover, setJoinHover] = useState(false);
  const navigate = useNavigate();

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#121212',
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#E0E0E0',
    fontSize: '3.5rem',
    fontWeight: '600',
    letterSpacing: '0.2rem',
    marginBottom: '40px', 
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', 
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
    width: '250px', 
  };

  const buttonHoverStyle = {
    background: '#fff',
    color: '#121212',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Welcome</h2>
        <div style={buttonGroupStyle}>
          <button
            style={{ ...buttonStyle, ...(createHover ? buttonHoverStyle : null) }}
            onMouseEnter={() => setCreateHover(true)}
            onMouseLeave={() => setCreateHover(false)}
            onClick={() => navigate("/create")}
          >
            Create Room
          </button>
          <button
            style={{ ...buttonStyle, ...(joinHover ? buttonHoverStyle : null) }}
            onMouseEnter={() => setJoinHover(true)}
            onMouseLeave={() => setJoinHover(false)}
            onClick={() => navigate("/join")}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}