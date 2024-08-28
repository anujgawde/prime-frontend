import React, { useState } from "react";
import BaseButton from "./BaseButton";

export default function BaseDropdown({ children, activeDocument }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block ">
      <div
        className="items-center flex justify-between w-full p-2 cursor-pointer border"
        onClick={toggleDropdown}
      >
        <div>{activeDocument?.name ?? "Select a Document"}</div>
        <div>
          <img src="/icons/navbar/chevron-down.svg" />
        </div>
      </div>
      {isOpen && (
        <div
          onClick={toggleDropdown}
          className="absolute right-0 left-0 mt-1 w-full bg-white border border-gray-100 shadow-lg z-10 rounded max-h-64 overflow-y-auto"
        >
          {children}
        </div>
      )}
    </div>
  );
}
