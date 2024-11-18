import { type FormEvent, useState } from "react";

export const AddIdiom = () => {
  const [phrase, setPhrase] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/addIdiom", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ phrase }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to add idiom");
    }
  };

  return (
    <div>
      <h2>Add New Idiom</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phrase}
          onChange={(event) => setPhrase(event.target.value)}
          placeholder="Enter new idiom"
          required
        />
        <button type="submit">Add Idiom</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
