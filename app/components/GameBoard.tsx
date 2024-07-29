import { useState } from "react";

import styles from "../styles/GameBoard.module.css";

export const GameBoard = () => {
  const [input, setInput] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleDecode = () => {
    setDecodedMessage(`Decoded: ${input}`);
  };

  return (
    <div className={styles.gameBoard}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your guess"
      />
      <button onClick={handleDecode}>Decode</button>
      <p>{decodedMessage}</p>
    </div>
  );
};
