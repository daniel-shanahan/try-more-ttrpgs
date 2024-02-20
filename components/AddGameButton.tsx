"use client";
import { Game } from "@/types/common.types";
import { useState } from "react";
import GameModal from "./GameModal";

export default function AddGameButton() {
  const [isGameModalOpen, setGameModalOpen] = useState(false);
  const [gameData, setGameData] = useState<Game | null>(null);

  const handleOpenGameModal = () => {
    setGameModalOpen(true);
  };

  const handleCloseGameModal = () => {
    setGameModalOpen(false);
  };

  const handleFormSubmit = (game: Game) => {
    setGameData(game);
    console.log(game);
    handleCloseGameModal();
  };

  return (
    <>
      <button
        className="rounded-lg bg-emerald-100 text-emerald-700 font-semibold shadow px-4 py-2 hover:shadow-xl hover:bg-emerald-50 hover:text-emerald-800 transition motion-reduce:transition-none"
        onClick={handleOpenGameModal}
      >
        Add Game
      </button>

      <GameModal
        isOpen={isGameModalOpen}
        onClose={handleCloseGameModal}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
