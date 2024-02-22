import GameCard from "@/components/GameCard";
import { Game } from "@/types/common.types";

interface GamesSectionProps {
  title: string;
  games: Game[];
}

export default function GamesSection({ title, games }: GamesSectionProps) {
  return (
    <section className="py-12">
      <h1 className="text-4xl mb-8">{title}</h1>
      <div className="flex flex-wrap gap-4">
        {games.map((game) => {
          return <GameCard key={game.name} game={game} />;
        })}
      </div>
    </section>
  );
}
