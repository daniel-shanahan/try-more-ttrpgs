"use client";

import { Game } from "@/types/common.types";
import { useState } from "react";
import GameModal from "./GameModal";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddGameButton() {
  const [isGameModalOpen, setGameModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenGameModal = () => {
    setGameModalOpen(true);
  };

  const handleCloseGameModal = () => {
    setGameModalOpen(false);
  };

  const handleFormSubmit = async (game: Game) => {
    await addDoc(collection(db, "games"), game);
    handleCloseGameModal();
    router.refresh();
  };

  return (
    <>
      <button
        className="rounded-lg bg-emerald-100 text-emerald-700 font-semibold shadow px-4 py-2 hover:shadow-xl hover:bg-emerald-50 hover:text-emerald-800 transition motion-reduce:transition-none"
        onClick={handleOpenGameModal}
      >
        Add Game
      </button>

      {isGameModalOpen && (
        <GameModal
          isOpen={isGameModalOpen}
          onClose={handleCloseGameModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
