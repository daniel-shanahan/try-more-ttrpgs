import { collection, getDocs, Firestore } from "firebase/firestore/lite";
import { db } from "../firebase/firebase";
import GameCard from "@/components/GameCard";
import { Game } from "@/types/common.types";
import AddGame from "./AddGame";

async function getGames(db: Firestore) {
  const gamesCol = collection(db, "games");
  const gamesSnapshot = await getDocs(gamesCol);
  const gamesList = gamesSnapshot.docs.map((doc) => doc.data()) as Game[];
  return gamesList;
}

export default async function Home() {
  const games = await getGames(db);

  return (
    <main className="container mx-auto px-4 pt-16">
      <AddGame />
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
