import React from "react";
import { Link } from "react-router-dom";
import BaseMenu from "../base/BaseMenu";

const DocumentCard = (props) => {
  const documentLineHex =
    props.identifier === "template" ? "#FED8B1" : "#D2E5F6";

  return (
    <div className="bg-white rounded-2xl flex flex-col">
      <Link to={props.navigate}>
        <div className="py-10 px-8 space-y-4">
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-full h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-3/4 h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-full h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-3/4 h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-full h-1 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: documentLineHex }}
            className="w-3/4 h-1 rounded-full"
          ></div>
        </div>
      </Link>
      <div className="py-3 border-t pl-6 pr-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{props.title}</p>
          <p className="text-xs">Updated on {props.modifiedAt}</p>
        </div>

        <div className="flex items-center">
          <BaseMenu iconSrc="/icons/base/ellipsis.svg">
            <Link
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none"
              to={props.navigate}
              target="_blank"
            >
              Open in New Tab
            </Link>

            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-red-600"
              onClick={() => props.deleteDocumentHandler(props.id)}
            >
              Remove
            </button>
          </BaseMenu>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
