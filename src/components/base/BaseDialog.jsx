import React from "react";
import BaseButton from "./BaseButton";

export default function BaseDialog({ text, type, size, isOpen, toggleDialog }) {
  if (!isOpen) {
    return null;
  }

  const closeDialog = () => {
    toggleDialog();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-4 relative z-50 h-1/4 flex flex-col justify-between">
        {/* Dialog Header */}
        <div className="text-2xl">There seems to be something wrong</div>

        {/* Dialog Content */}
        <div>{text}</div>

        {/* Dialog CTA */}
        <div className="flex justify-end items-center">
          <BaseButton buttonText="Close" onClick={closeDialog} />
        </div>
      </div>
    </div>
  );
}
