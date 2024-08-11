// "use client";

// import { useState, useEffect, ChangeEvent } from "react";

// import styles from "../styles/GameBoard.module.css";
// import { decodeMessage, isCorrectDecode } from "../lib/gameLogic";

// export const GameBoard = () => {
//   const [input, setInput] = useState("");
//   const [decodedMessage, setDecodedMessage] = useState("");

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//   };

//   const handleDecode = () => {
//     setDecodedMessage(`Decoded: ${input}`);
//   };

//   return (
//     <div className={styles.gameBoard}>
//       <input
//         className={styles.gameInput}
//         type="text"
//         value={input}
//         onChange={handleInputChange}
//         placeholder="Enter your guess"
//       />
//       <button className={styles.gameButton} onClick={handleDecode}>
//         Decode
//       </button>
//       <p>{decodedMessage}</p>
//     </div>
//   );
// };
