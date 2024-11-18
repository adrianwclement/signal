import { useSession, signIn, signOut } from "next-auth/react";
import { type FormEvent, useState, ChangeEvent } from "react";

const AddIdiom = () => {
  const { data: session, status } = useSession();
  const [phrase, setPhrase] = useState("");
  const [message, setMessage] = useState("");

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/addIdiom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phrase }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  const handleGoogleSignOut = () => {
    signOut();
  };

  const handleSubmitIdiom = (event: ChangeEvent<HTMLInputElement>) => {
    setPhrase(event.target.value);
  };

  return (
    <div>
      <h2>Add New Idiom</h2>
      <button onClick={handleGoogleSignOut}>Sign out</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phrase}
          onChange={handleSubmitIdiom}
          placeholder="Enter new idiom"
          required
        />
        <button type="submit">Add Idiom</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddIdiom;
