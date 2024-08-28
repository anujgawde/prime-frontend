import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import ProtectedRoute from "./components/ProtectedRoute";

import TemplatesPage from "./pages/templates";
import DocumentsPage from "./pages/documents";
import TemplateEditorPage from "./pages/templates/template-editor";
import DocumentEditorPage from "./pages/documents/document-editor";

function App() {
  return (
    <div className="h-screen overflow-y-auto">
      <Routes>
        <Route path="/" element={<Navigate to={`/dashboard`} />} />
        <Route
          path="/auth"
          element={
            <ProtectedRoute>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <TemplatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates/:id"
          element={
            <ProtectedRoute>
              <TemplateEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents/:templateId/:id"
          element={
            <ProtectedRoute>
              <DocumentEditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
