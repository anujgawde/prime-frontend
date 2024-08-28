import React, { useState } from "react";

const BaseMenu = ({ iconContainerClass, iconSrc, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <div
        className={
          iconContainerClass
            ? iconContainerClass
            : "cursor-pointer flex items-center hover:bg-gray-200 rounded-full p-2"
        }
        onClick={toggleDropdown}
      >
        <img src={iconSrc} className="h-5 w-5" />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-lg z-10 rounded">
          {children}
        </div>
      )}
    </div>
  );
};

export default BaseMenu;
