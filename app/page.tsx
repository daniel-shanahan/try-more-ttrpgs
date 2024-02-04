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
    return gamesList;
  }

  const games = await getGames(db);

  return (
    <main className="container mx-auto px-4 pt-16">
      <section className="py-12">
        <h1 className="text-4xl mb-8">Games</h1>
        <div className="flex flex-wrap gap-4">
          {games.map((game) => {
            return <GameCard key={game.name} game={game} />;
          })}
        </div>
      </section>
    </main>
  );
}
