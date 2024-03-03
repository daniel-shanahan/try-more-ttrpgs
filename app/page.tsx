import { getGamesPlayed, getGamesToTry } from "@/firebase/firestore";
import GamesSection from "@/components/GamesSection";
import GamePicker from "@/components/GamePicker";

export default async function Home() {
  const gamesToTry = await getGamesToTry();
  const gamesPlayed = await getGamesPlayed();

  return (
    <main className="container mx-auto px-4 pt-16">
      <GamePicker games={gamesToTry} />
      <GamesSection title="Games to try" games={gamesToTry} />
      <GamesSection title="Games I've played" games={gamesPlayed} />
    </main>
  );
}
