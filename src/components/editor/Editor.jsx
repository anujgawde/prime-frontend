import React, { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
window.Quill = Quill;
Quill.register("modules/imageResize", ImageResize);
// modules = {

// };
const AUTO_SAVE = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  [("image", "blockquote", "code-block")],
  ["clean"],
];
export default function EditorComponent({
  socketIdentifier,
  documentName,
  updateDocumentName,
  customButtonClicked,
}) {
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const { id: documentId, templateId } = useParams();

  const auth = useAuthContext();

  //   Socket Connection:
  useEffect(() => {
    const s = io("https://prime-backend-six.vercel.app", {
      path: "/socket.io", // Must match the server path
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  //   Quill Creation:
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        table: true,
        imageResize: {
          parchment: Quill.import("parchment"),
          modules: ["Resize", "DisplaySize"],
        },
      },
    });
    setQuill(q);
    q.disable();
    q.setText("Loading the document...");
  }, []);

  //   Emitting Changes:
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //   Implementing changes to the document:
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);
    return (
      () => {
        socket.off("receive-changes", handler);
      },
      [socket, quill]
    );
  }, []);

  //   Specific Document
  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once(`load-${socketIdentifier}`, (document) => {
      updateDocumentName(document.name);
      quill.setContents(document.data);
      quill.enable();
    });
    const getDocumentConfig = {
      docReference: documentId,
      userId: auth.currentUser._id,
    };
    if (templateId) {
      getDocumentConfig.templateId = templateId;
    }

    socket.emit(`get-${socketIdentifier}`, getDocumentConfig);
  }, [socket, quill, documentId]);

  // Save Document in intervals:
  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit(`save-${socketIdentifier}`, quill.getContents());
    }, AUTO_SAVE);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.emit(
      `update-${socketIdentifier}-${documentId}-details`,
      documentName ?? "Untitled Document"
    );
  }, [documentName]);

  const insertTable = () => {
    const rows = prompt("Enter number of rows:");
    const columns = prompt("Enter number of columns:");

    let table = "<table class='custom-table'>";
    for (let i = 0; i < rows; i++) {
      table += "<tr class='custom-row'>";
      for (let j = 0; j < columns; j++) {
        table += "<td class='custom-cell'></td>";
      }
      table += "</tr>";
    }
    table += "</table>";

    quill.clipboard.dangerouslyPasteHTML(quill.getLength(), table);
  };

  useEffect(() => {
    if (customButtonClicked) {
      handleButtonClick(customButtonClicked);
    }
  }, [customButtonClicked]);

  // Function to handle file change (image selection)
  const handleFileChange = (buttonData) => {
    const file = buttonData.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageURL = reader.result;
        if (quill) {
          const range = quill.getSelection();
          quill.insertEmbed(range ? range.index : 0, "image", imageURL);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (buttonData) => {
    switch (buttonData.type) {
      case "picture":
        handleFileChange(buttonData.data);
        break;
      case "table":
        insertTable();
        break;
      default:
        console.log("Unknown button clicked");
    }
  };

  return (
    <div>
      <div
        id="container"
        className="container w-full mt-[80px]"
        ref={wrapperRef}
      ></div>
      <button onClick={insertTable}>insert table</button>

      {/* Button to trigger the camera input */}

      <input
        type="file"
        accept="image/*"
        capture="camera"
        onChange={handleFileChange}
        id="cameraInput"
      />
      <label htmlFor="cameraInput">
        <button>Capture Image</button>
      </label>
    </div>
  );
}
