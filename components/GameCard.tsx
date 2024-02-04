import { Game } from "@/types/common.types";
import Image from "next/image";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const { name, imageUrl, description, crunch, genre, gmRequired, playedDate } =
    game;

  return (
    <div className="">
      <Image src={imageUrl} alt={name} width={150} height={100} />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="">{description}</p>
    </div>
  );
}
