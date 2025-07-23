import React, { useState } from "react";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  /**
   * Modern, minimalistic, light-themed Tic Tac Toe Game
   * - Responsive, centered board
   * - Game status and restart button
   * - Uses theme colors: accent (#e53935), primary (#1976d2), secondary (#424242)
   */

  // Board state: 9 elements (null | "X" | "O")
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' is always first
  const [isXNext, setIsXNext] = useState(true);
  // Track game over state
  const [gameOver, setGameOver] = useState(false);
  // Track winner: "X", "O", "Draw", or null
  const [winner, setWinner] = useState(null);

  // Helper: check winner
  function calculateWinner(b) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6],         // diagonals
    ];
    for (let [a,b1,c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    if (b.every(cell => cell)) return "Draw";
    return null;
  }

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    // If game over or occupied cell, do nothing
    if (gameOver || board[idx]) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? "X" : "O";
    const res = calculateWinner(nextBoard);
    setBoard(nextBoard);
    setIsXNext(x => !x);
    setWinner(res);
    setGameOver(res ? true : false);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner === "Draw") return "It's a draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next: ${isXNext ? "X" : "O"}`;
  }

  // Minimal achievable for accessibility
  return (
    <div className="ttt-app-outer">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      <div className="ttt-board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`ttt-cell${cell ? " filled" : ""}`}
            aria-label={
              cell
                ? `Cell ${idx+1}, ${cell}`
                : `Cell ${idx+1}, empty. Click to place ${isXNext ? "X" : "O"}`
            }
            onClick={() => handleCellClick(idx)}
            disabled={Boolean(cell) || gameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="ttt-status">{renderStatus()}</div>
      <button className="ttt-restart-btn" onClick={handleRestart} aria-label="Restart game">
        Restart
      </button>
      <div className="ttt-footer">
        <span>
          <small>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ttt-secondary)", textDecoration: "underline" }}
            >
              Built with React
            </a>
          </small>
        </span>
      </div>
    </div>
  );
}

export default App;
