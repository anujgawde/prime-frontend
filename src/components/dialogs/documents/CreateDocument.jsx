import React, { useEffect, useState } from "react";
import BaseButton from "../../base/BaseButton";
import BaseDropdown from "../../base/BaseDropdown";
import { getAllTemplates } from "../../../api/templates";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CreateDocument({
  text,
  type,
  size,
  isOpen,
  toggleDialog,
  documents,
  user,
}) {
  const [templates, setTemplates] = useState([]);
  const [activeDocument, setActiveDocument] = useState({});
  const fetchTemplates = async () => {
    const templateResponse = await getAllTemplates(user._id);
    setTemplates(templateResponse);
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const closeDialog = () => {
    toggleDialog();
  };

  const createDocument = () => {
    if (activeDocument._id) {
      toggleDialog();
      navigate(`/documents/${activeDocument._id}/${uuidv4()}`);
    }
  };
  return (
    <div
      onClick={closeDialog}
      className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 p-4 relative h-1/4 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to the parent div
      >
        {/* Dialog Header */}
        <div className="text-xl">Please select a template for the document</div>

        {/* Dialog Content */}
        <div>{text}</div>

        <BaseDropdown activeDocument={activeDocument}>
          {templates.map((template, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none"
              onClick={() => setActiveDocument(template)}
            >
              {template.name}
            </button>
          ))}
        </BaseDropdown>

        {/* Dialog CTA */}
        <BaseButton buttonText="Create!" onClick={createDocument} />
      </div>
    </div>
  );
}
