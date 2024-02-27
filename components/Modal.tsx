"use client";

import { useState, useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isModalOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    onClose();
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={className}>
      {title && <h2 className="text-xl mb-6">{title}</h2>}
      <button
        onClick={handleCloseModal}
        className="absolute top-0 right-0 text-xl pb-1 mt-2 mr-2 h-10 w-10 flex justify-center items-center focus:outline-none focus:bg-gray-200 hover:bg-gray-200 rounded transition motion-reduce:transition-none"
      >
        x
      </button>
      {children}
    </dialog>
  );
}
