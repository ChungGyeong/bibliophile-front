import React, { useEffect, useRef, FC } from "react";
import Button from "@/components/common/Button.tsx";

interface ModalProps {
  isOpen: boolean;
  handleClickClose: () => void;
  title?: string;
  handleClickConfirm: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, handleClickClose, title, handleClickConfirm }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      (previousActiveElement.current as HTMLElement)?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClickClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClickClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className="bg-white rounded-lg border-common shadow-lg w-4/5 max-w-lg p-8 flex flex-col items-center relative focus:outline-none"
        ref={modalRef}
        tabIndex={-1}
      >
        <p className="font-regular text-base mb-6">{title}</p>
        <button
          className="absolute top-1 right-3 text-gray-500 text-xl focus:outline-none"
          onClick={handleClickClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <Button label="확인" handleClickButton={handleClickConfirm} />
      </div>
    </div>
  );
};

export default Modal;
