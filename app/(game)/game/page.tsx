import { FrequencyChart } from "../../../components/FrequencyChart";
import { GameBoard } from "../../../components/GameBoard";
import { Header } from "../../../components/Header";

export default function Game() {
  return (
    <div>
      <Header />
      <main>
        <GameBoard />
        <FrequencyChart />
      </main>
    </div>
  );
}
