import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditorComponent from "../../../components/editor/Editor";
import { useEffect, useState } from "react";

export default function DocumentEditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [socketIdentifier, setSocketIdentifier] = useState();
  const [customButtonClicked, setCustomButtonClicked] = useState();
  const [documentName, setDocumentName] = useState("Untitled Document");

  const onTitleBlur = () => {
    console.log(documentName);
    if (!documentName || !documentName.length > 0) {
      setDocumentName("Untitled Document");
    }
  };

  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.includes("templates") && id) {
      setSocketIdentifier("template");
    } else if (pathName.includes("documents") && id) {
      setSocketIdentifier("document");
    }
  }, [location.pathname]);

  const updateDocumentName = (updatedName) => {
    console.log(updatedName);
    setDocumentName(updatedName);
  };

  const handleCustomButtonClick = (buttonData) => {
    setCustomButtonClicked(buttonData);
  };

  return (
    <div className="w-full">
      <div className="bg-white py-4 flex items-center justify-center z-[9999] absolute h-[80px] left-0 right-0 border-b top-0">
        <div className="absolute left-5">
          <button
            onClick={() => navigate(-1)}
            className="appearance-none bg-transparent border-none p-2 rounded-xl focus:outline-none hover:bg-gray-200 "
          >
            <img className="h-8 w-8" src="/icons/base/arrow.svg" />
          </button>
        </div>
        <input
          className="text-2xl text-center"
          value={documentName ?? "Untitled Document"}
          onBlur={onTitleBlur}
          onChange={(e) => setDocumentName(e.target.value ?? "")}
        />
        <div className="flex items-center fixed right-5 space-x-4">
          <button
            onClick={() => {
              handleCustomButtonClick({ type: "table" });
            }}
            className="border-none p-0"
          >
            <img src="/icons/editor/table.svg" className="h-5 w-5" />
          </button>
          <label
            htmlFor="camera-input"
            className="border-none p-0 cursor-pointer"
          >
            <input
              className="hidden"
              type="file"
              accept="image/*"
              capture="camera"
              onChange={(event) => {
                handleCustomButtonClick({ type: "picture", data: event });
              }}
              id="camera-input"
            />
            <img src="/icons/editor/camera.svg" className="h-5 w-5" />
          </label>
        </div>
      </div>
      <EditorComponent
        socketIdentifier={socketIdentifier}
        documentName={documentName}
        updateDocumentName={updateDocumentName}
        customButtonClicked={customButtonClicked}
      />
    </div>
  );
}
