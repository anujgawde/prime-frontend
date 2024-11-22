import BaseButton from "../../components/base/BaseButton";
import DocumentCard from "../../components/documents/DocumentCard";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/utils";
import CreateDocument from "../../components/dialogs/documents/CreateDocument";
import { useAuthContext } from "../../context/AuthContext";
import { getAllDocuments } from "../../api/documents";
import { deleteDocument } from "../../api/documents";

export default function DocumentsPage() {
  const auth = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState();

  const fetchDocuments = async () => {
    const documentResponse = await getAllDocuments(auth.currentUser._id);
    setDocuments(documentResponse);
  };

  const deleteDocumentHandler = async (documentId) => {
    // Delete the document here
    const deleteDocumentResponse = await deleteDocument(
      documentId,
      auth.currentUser
    );
    setDocuments(deleteDocumentResponse.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <div className="w-full py-4 px-8 bg-white flex justify-end items-center">
        <BaseButton
          buttonText="Create New"
          onClick={() => setIsDocumentDialogOpen(true)}
        />
      </div>
      <div className="py-8 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((document, index) => (
          <DocumentCard
            id={document._id}
            navigate={`${document.templateId}/${document._id}`}
            title={document.name}
            modifiedAt={formatDate(document.modifiedAt)}
            deleteDocumentHandler={deleteDocumentHandler}
            key={index}
            identifier="document"
          />
        ))}
      </div>
      {isDocumentDialogOpen && (
        <CreateDocument
          user={auth.currentUser}
          documents={documents}
          isOpen={isDocumentDialogOpen}
          toggleDialog={() => setIsDocumentDialogOpen(false)}
        />
      )}
    </div>
  );
}
