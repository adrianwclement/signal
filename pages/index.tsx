import { GetServerSidePropsContext } from "next";
import { signIn, getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

interface Phrase {
  encoded_phrase: string;
  original_phrase: string;
}

interface HomeProps {
  session: any;
}

export default function Home({ session }: HomeProps) {
  const { data: sessionData } = useSession();
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  useEffect(() => {
    fetch("/api/getDailyIdiom")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setPhrases(data);
        }
      })
      .catch((error) => console.error("Error fetching daily idioms:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Welcome to Signal</h1>
      <h2>A Daily Word Decoding Game</h2>
      <h3>Inspired by the Wordle & Other NYT-style word games</h3>
      {session ? (
        <p>Welcome, {session.user?.email}</p>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in to add idioms</button>
      )}
      <div className={styles.phrases}>
        {phrases.map((phrase, index) => (
          <div key={index} className={styles.phrase}>
            <p>
              <strong>Encoded Phrase:</strong> {phrase.encoded_phrase}
            </p>
            <p>
              <strong>Original Phrase:</strong> {phrase.original_phrase}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

// import { useState, useEffect, ChangeEvent } from "react";

// import { decodeMessage, isCorrectDecode } from "../lib/gameLogic";
// import styles from "../styles/Home.module.css";

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [decodedMessage, setDecodedMessage] = useState("");
//   const [encodedPhrase, setEncodedPhrase] = useState("");
//   const [originalPhrase, setOriginalPhrase] = useState("");
//   const [cipher, setCipher] = useState<Record<string, string>>({});
//   const [isCorrect, setIsCorrect] = useState(false);

//   useEffect(() => {
//     fetch("/api/getDailyIdiom")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           console.error(data.error);
//         } else {
//           setEncodedPhrase(data.encoded_phrase);
//           setOriginalPhrase(data.original_phrase);
//           setCipher(data.cipher);
//         }
//       })
//       .catch((error) => console.error("Error fetching faily idiom:", error));
//   }, []);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setInput(event.target.value);
//   };

//   const handleDecode = () => {
//     const decoded = decodeMessage(input, cipher);
//     setDecodedMessage(decoded);
//     setIsCorrect(isCorrectDecode(originalPhrase, decoded));
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Daily Word Decoding Game</h1>
//       <p>Encoded Phrase: {encodedPhrase}</p>
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
//       <p>Decoded Message: {decodedMessage}</p>
//       {isCorrect && <p>Correct!</p>}
//     </div>
//   );
// }
