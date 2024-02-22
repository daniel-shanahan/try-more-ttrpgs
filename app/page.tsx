import GamesToTry from "@/components/GamesToTry";
import GamesPlayed from "@/components/GamesPlayed";

export default async function Home() {
  return (
    <main className="container mx-auto px-4 pt-16">
      <GamesToTry />
      <GamesPlayed />
    </main>
  );
}
