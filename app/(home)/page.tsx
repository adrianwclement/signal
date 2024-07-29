import Link from "next/link";

import { Header } from "../../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to Signal.io!</h2>
        <Link href="/game">Start Game</Link>
      </main>
    </div>
  );
}
