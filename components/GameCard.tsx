import { Game } from "@/types/common.types";
import Image from "next/image";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const {
    name,
    imageUrl,
    description,
    crunch,
    genre,
    gmRequired,
    playedDate,
    played,
  } = game;

  return (
    <div className="flex flex-col justify-between rounded shadow-md hover:shadow-lg focus:shadow-lg w-64 overflow-hidden border border-gray-200">
      <div>
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={100}
          className="w-full aspect-[1/1.29] object-cover"
        />
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          {description && <p className="py-2">{description}</p>}
          {played && (
            <p className="py-2 text-xs font-semibold text-gray-400">
              {playedDate}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 px-6 py-4">
        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
          {crunch} Crunch
        </span>
        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
          {genre}
        </span>
        <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
          {gmRequired ? "GM Required" : "GM-less"}
        </span>
      </div>
    </div>
  );
}
