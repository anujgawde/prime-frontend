import { useEffect, useState } from "react";
import { deleteTemplate, getAllTemplates } from "../../api/templates";
import DocumentCard from "../../components/documents/DocumentCard";
import { formatDate } from "../../utils/utils";
import BaseButton from "../../components/base/BaseButton";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const auth = useAuthContext();

  const fetchTemplates = async () => {
    const templateResponse = await getAllTemplates(auth.currentUser._id);
    setTemplates(templateResponse);
  };

  const deleteTemplateHandler = async (templateId) => {
    // Delete the document here
    const deleteDocumentResponse = await deleteTemplate(
      templateId,
      auth.currentUser
    );
    setTemplates(deleteDocumentResponse.data);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>
      <div className="w-full py-4 px-8 bg-white flex justify-end items-center">
        <Link to={`${uuidv4()}`}>
          <BaseButton buttonText="Build New" />
        </Link>
      </div>
      <div className="py-8 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {templates.map((template, index) => (
          <DocumentCard
            id={template._id}
            navigate={template._id}
            title={template.name}
            modifiedAt={formatDate(template.modifiedAt)}
            key={index}
            deleteDocumentHandler={deleteTemplateHandler}
            identifier="template"
          />
        ))}
      </div>
    </div>
  );
}
