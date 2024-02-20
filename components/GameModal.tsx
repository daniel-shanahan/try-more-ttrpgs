"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { Game } from "@/types/common.types";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (game: Game) => void;
}

const initialGameModalData: Game = {
  name: "",
  description: "",
  imageUrl: "",
  crunch: "High",
  genre: "Fantasy",
  gmRequired: true,
  played: false,
  playedDate: "",
};

export default function GameModal({
  isOpen,
  onClose,
  onSubmit,
}: GameModalProps) {
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<Game>(initialGameModalData);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formState);
    setFormState(initialGameModalData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-1/2 p-4 rounded-lg backdrop:bg-black backdrop:bg-opacity-50"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 container mx-auto"
      >
        <h1>Add Game</h1>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="block w-full"
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            rows={2}
            className="block w-full"
          />
        </label>
        <label>
          Image URL
          <input
            type="url"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleInputChange}
            className="block w-full"
            required
          />
        </label>
        <div className="flex justify-between">
          <label>
            Played
            <select
              name="played"
              value={formState.played.toString()}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  played: e.target.value === "true",
                }))
              }
              className="block"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          <label>
            Played Date
            <input
              type="date"
              name="playedDate"
              value={formState.playedDate}
              onChange={handleInputChange}
              className="block"
              disabled={!formState.played}
            />
          </label>
        </div>
        <div className="flex justify-between">
          <fieldset className="flex flex-col">
            <legend>Genre</legend>
            <label>
              <input
                type="radio"
                name="genre"
                checked={formState.genre === "Fantasy"}
                value="Fantasy"
                onChange={handleInputChange}
                required
              />
              Fantasy
            </label>
            <label>
              <input
                type="radio"
                name="genre"
                checked={formState.genre === "Sci-Fi"}
                value="Sci-Fi"
                onChange={handleInputChange}
              />
              Sci-Fi
            </label>
            <label>
              <input
                type="radio"
                name="genre"
                checked={formState.genre === "Horror"}
                value="Horror"
                onChange={handleInputChange}
              />
              Horror
            </label>
            <label>
              <input
                type="radio"
                name="genre"
                checked={formState.genre === "Superhero"}
                value="Superhero"
                onChange={handleInputChange}
              />
              Superhero
            </label>
            <label>
              <input
                type="radio"
                name="genre"
                checked={formState.genre === "Modern"}
                value="Modern"
                onChange={handleInputChange}
              />
              Modern
            </label>
          </fieldset>
          <fieldset className="flex flex-col">
            <legend>Crunch</legend>
            <label>
              <input
                type="radio"
                name="crunch"
                checked={formState.crunch === "High"}
                value="High"
                onChange={handleInputChange}
                required
              />
              High
            </label>
            <label>
              <input
                type="radio"
                name="crunch"
                checked={formState.crunch === "Medium"}
                value="Medium"
                onChange={handleInputChange}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="crunch"
                checked={formState.crunch === "Low"}
                value="Low"
                onChange={handleInputChange}
              />
              Low
            </label>
          </fieldset>
          <fieldset className="flex flex-col">
            <legend>GM Required</legend>
            <label>
              <input
                type="radio"
                name="gmRequired"
                checked={formState.gmRequired === true}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, gmRequired: true }))
                }
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="gmRequired"
                checked={formState.gmRequired === false}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, gmRequired: false }))
                }
              />
              No
            </label>
          </fieldset>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-100 font-semibold rounded-full shadow-md hover:shadow-lg transition motion-reduce:transition-none"
        >
          Add Game
        </button>
      </form>
    </Modal>
  );
}
