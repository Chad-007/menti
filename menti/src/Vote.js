import React, { useEffect, useState } from "react";
import axios from "axios";

function Vote() {
  const [votes, setVotes] = useState({ A: 0, B: 0, C: 0 });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "update") setVotes(data.votes);
    };
    return () => ws.close();
  }, []);

  const sendVote = (option) => {
    const ws = new WebSocket("ws://localhost:4000");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "vote", option }));
      ws.close();
    };
  };

  return (
    <div>
      <h2>Vote</h2>
      <button onClick={() => sendVote("A")}>A</button>
      <button onClick={() => sendVote("B")}>B</button>
      <button onClick={() => sendVote("C")}>C</button>

      <h3>Live Votes:</h3>
      <p>A: {votes.A}</p>
      <p>B: {votes.B}</p>
      <p>C: {votes.C}</p>
    </div>
  );
}

export default Vote;
