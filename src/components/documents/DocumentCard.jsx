import React, { useState, useEffect } from "react";
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
            className={`w-full h-1 rounded-full bg-[${documentLineHex}]`}
          ></div>
          <div
            className={`w-3/4 h-1 rounded-full bg-[${documentLineHex}]`}
          ></div>
          <div
            className={`w-full h-1 rounded-full bg-[${documentLineHex}]`}
          ></div>
          <div
            className={`w-3/4 h-1 rounded-full  bg-[${documentLineHex}]`}
          ></div>
          <div
            className={`w-full h-1 rounded-full bg-[${documentLineHex}]`}
          ></div>
          <div
            className={`w-3/4 h-1 rounded-full  bg-[${documentLineHex}]`}
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
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-red-600"
              onClick={() => props.deleteDocumentHandler(props.id)}
            >
              Delete
            </button>
          </BaseMenu>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
