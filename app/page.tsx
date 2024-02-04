import { collection, getDocs, Firestore } from "firebase/firestore/lite";
import { db } from "../firebase/firebase";
import Image from "next/image";
import GameCard from "@/components/GameCard";
import { Game } from "@/types/common.types";

export default async function Home() {
  async function getGames(db: Firestore) {
    const gamesCol = collection(db, "games");
    const gamesSnapshot = await getDocs(gamesCol);
    const gamesList = gamesSnapshot.docs.map((doc) => doc.data()) as Game[];
    console.log(gamesList);
    return gamesList;
  }

  const games = await getGames(db);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <h1 className="text-4xl">Games</h1>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {games.map((game) => {
            return <GameCard key={game.name} game={game} />;
          })}
        </div>
      </section>
    </main>
  );
}
