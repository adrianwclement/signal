import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleGuest = () => {
    router.push("/"); //FILL
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <button onClick={handleGuest}>Continue as guest</button>
    </div>
  );
}
