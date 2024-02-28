"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { Game } from "@/types/common.types";

interface GameModalProps {
  mode: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (game: Game) => void;
  onDelete?: () => void;
  initialData?: Game;
}

const defaultInitialData: Game = {
  name: "",
  description: "",
  imageUrl: "",
  crunch: "High",
  genre: "Fantasy",
  gmRequired: true,
  played: false,
  playedDate: "",
  thoughts: "",
};

export default function GameModal({
  mode,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  initialData = defaultInitialData,
}: GameModalProps) {
  const focusInputRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<Game>(initialData);

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
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === "add" ? "Add Game" : "Edit Game"}
      className="w-full md:w-9/12 md:max-w-2xl pb-10 pt-4 px-6 md:px-10 rounded backdrop:bg-black backdrop:bg-opacity-50"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 container text-gray-700"
      >
        <label className="text-xs tracking-wide font-bold uppercase">
          Name
          <input
            type="text"
            name="name"
            ref={focusInputRef}
            value={formState.name}
            onChange={handleInputChange}
            className="block w-full mt-2 appearance-none py-2 px-4 bg-gray-200 border-gray-200 border rounded leading-none focus:outline-none focus:bg-white focus:border-emerald-500 transition motion-reduce:transition-none text-transform:none font-normal text-base"
            placeholder="The Witch is Dead"
            required
          />
        </label>
        <label className="text-xs tracking-wide font-bold uppercase">
          Image URL
          <input
            type="url"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="block w-full mt-2 appearance-none py-3 px-4 bg-gray-200 border-gray-200 border rounded leading-none focus:outline-none focus:bg-white focus:border-emerald-500 transition motion-reduce:transition-none text-transform:none font-normal text-base"
            required
          />
        </label>
        <label className="text-xs tracking-wide font-bold uppercase">
          Description
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            placeholder="I want to try this game"
            rows={2}
            className="block w-full mt-2 appearance-none py-3 px-4 bg-gray-200 border-gray-200 border rounded leading-none focus:outline-none focus:bg-white focus:border-emerald-500 transition motion-reduce:transition-none text-transform:none font-normal text-base"
          />
        </label>
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
        <div className="flex justify-between">
          <label className="text-xs tracking-wide font-bold uppercase">
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
              className="block w-full mt-2 py-3 px-4 bg-gray-200 border-gray-200 border rounded leading-none focus:outline-none focus:bg-white focus:border-emerald-500 transition motion-reduce:transition-none text-transform:none font-normal text-base"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          {formState.played && (
            <label className="text-xs tracking-wide font-bold uppercase">
              Played Date
              <input
                type="date"
                name="playedDate"
                value={formState.playedDate}
                onChange={handleInputChange}
                className="block w-full mt-2 appearance-none py-3 px-4 bg-gray-200 border-gray-200 border rounded leading-none focus:outline-none focus:bg-white focus:border-emerald-500 transition motion-reduce:transition-none text-transform:none font-normal text-base"
              />
            </label>
          )}
        </div>
        {formState.played && (
          <label className="text-xs tracking-wide font-bold uppercase">
            Thoughts
            <textarea
              name="thoughts"
              value={formState.thoughts}
              onChange={handleInputChange}
              placeholder="My impression after playing"
              rows={2}
              className="block w-full mt-2 appearance-none py-3 px-4 bg-gray-200 border-gray-200 border rounded leading-none focus:outline-none focus:bg-white focus:border-emerald-500 transition motion-reduce:transition-none text-transform:none font-normal text-base"
            />
          </label>
        )}
        {mode === "add" && (
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-100 font-semibold rounded-full shadow-md hover:shadow-lg transition motion-reduce:transition-none"
          >
            Add Game
          </button>
        )}
        {mode === "edit" && (
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-red-100 font-semibold rounded-full shadow-md hover:shadow-lg transition motion-reduce:transition-none"
            >
              Delete
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-100 font-semibold rounded-full shadow-md hover:shadow-lg transition motion-reduce:transition-none"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
}
