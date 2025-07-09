import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CreateRoom() {
  const [roomId] = useState(uuidv4().slice(0, 6).toUpperCase());//lazy rand..
  const [isHovered, setIsHovered] = useState(false);
  
  const [questions] = useState([
    {
      question: "Which data structure operates on the Last-In, First-Out (LIFO) principle?",
      options: ["Queue", "Stack", "Linked List"],
      answer: "Stack",
    },
    {
      question: "What is the worst-case time complexity of a binary search algorithm?",
      options: ["O(n)", "O(log n)", "O(n^2)"],
      answer: "O(log n)",
    },
    {
      question: "Which Git command is used to download a repository from a remote source for the first time?",
      options: ["git pull", "git commit", "git clone"],
      answer: "git clone",
    },
    {
      question: "What does HTTP stand for in the context of web development?",
      options: ["HyperText Transfer Protocol", "High-Text Transfer Page", "HyperText Transmission Protocol"],
      answer: "HyperText Transfer Protocol",
    },
    {
      question: "Which of these is a core principle of Object-Oriented Programming (OOP)?",
      options: ["Recursion", "Immutability", "Inheritance"],
      answer: "Inheritance",
    },
  ]);
  
  const navigate = useNavigate();

  function startRoom() {
    navigate(`/room/${roomId}?admin=true`, { state: { questions } });
  }

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
    gap: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '3.5rem',
    fontWeight: '600',
    letterSpacing: '0.2rem',
    margin: 0,
  };

  const infoTextStyle = {
    color: '#888',
    fontSize: '1.1rem',
    marginTop: '25px',
  };

  const roomIdStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    letterSpacing: '0.8rem',
    color: '#fff',
    border: '1px solid #444',
    padding: '15px 30px',
    borderRadius: '4px',
    background: '#1A1A1A',
    margin: '5px 0 25px 0', 
  };

  const buttonStyle = {
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
  };

  const buttonHoverStyle = {
    background: '#fff',
    color: '#121212',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Create Room</h2>
        <p style={infoTextStyle}>Your new room is ready. Share this code:</p>
        <div style={roomIdStyle}>{roomId}</div>
        <button
          style={{ ...buttonStyle, ...(isHovered ? buttonHoverStyle : null) }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={startRoom}
        >
          Start
        </button>
      </div>
    </div>
  );
}