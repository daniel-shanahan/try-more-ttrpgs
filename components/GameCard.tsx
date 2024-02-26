"use client";

import { useState } from "react";
import GameModal from "./GameModal";
import { Game } from "@/types/common.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface GameCardProps {
  id: string;
  game: Game;
}

export default function GameCard({ id, game }: GameCardProps) {
  const router = useRouter();
  const [isGameModalOpen, setGameModalOpen] = useState(false);

  const handleOpenGameModal = () => {
    setGameModalOpen(true);
  };

  const handleCloseGameModal = () => {
    setGameModalOpen(false);
  };

  const handleFormSubmit = async (game: Game) => {
    await updateDoc(doc(db, "games", id), game);
    handleCloseGameModal();
    router.refresh();
  };

  return (
    <>
      <button
        className="flex flex-col justify-between rounded shadow-md hover:shadow-lg focus:shadow-lg w-64 overflow-hidden border border-gray-200 transition motion-reduce:transition-none text-left"
        onClick={handleOpenGameModal}
      >
        <div>
          <Image
            src={game.imageUrl}
            alt={game.name}
            width={150}
            height={100}
            className="w-full aspect-[1/1.29] object-cover"
          />
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold">{game.name}</h2>
            {game.description && <p className="py-2">{game.description}</p>}
            {game.played && (
              <p className="py-2 text-xs font-semibold text-gray-400">
                {game.playedDate}
              </p>
            )}
            {game.thoughts && <p className="py-2">{game.thoughts}</p>}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 px-6 py-4">
          <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
            {game.crunch} Crunch
          </span>
          <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
            {game.genre}
          </span>
          <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
            {game.gmRequired ? "GM Required" : "GM-less"}
          </span>
        </div>
      </button>

      {isGameModalOpen && (
        <GameModal
          isOpen={isGameModalOpen}
          onClose={handleCloseGameModal}
          onSubmit={handleFormSubmit}
          initialData={game}
        />
      )}
    </>
  );
}
