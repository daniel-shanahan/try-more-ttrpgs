"use client";
import { useState } from "react";

export default function AddGameButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <button
      className="rounded-lg bg-emerald-100 text-emerald-700 font-semibold shadow px-4 py-2 hover:shadow-xl hover:bg-emerald-50 hover:text-emerald-800 transition motion-reduce:transition-none"
      onClick={() => setShowForm(true)}
    >
      Add Game
    </button>
  );
}
