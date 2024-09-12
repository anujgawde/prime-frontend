import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideNavigationTab from "./SideNavigationTab";
import { v4 as uuidv4 } from "uuid";
import CreateDocument from "../../dialogs/documents/CreateDocument";
import { useAuthContext } from "../../../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState();
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState();
  const auth = useAuthContext();

  const sideNavigationTabs = [
    {
      label: "Dashboard",
      navigateTo: "/dashboard",
      icon: "/icons/side-nav/home.svg",
      isTabActive: location.pathname.includes("/dashboard"),
    },
    {
      label: "Documents",
      navigateTo: "/documents",
      icon: "/icons/side-nav/documents.svg",
      isTabActive: location.pathname.includes("/documents"),
    },
    {
      label: "Templates",
      navigateTo: "/templates",
      icon: "/icons/side-nav/templates.svg",
      isTabActive: location.pathname.includes("/templates"),
    },
    {
      label: "Build a Template",
      navigateTo: `/templates/${uuidv4()}`,
      icon: "/icons/side-nav/build-template.svg",
    },
    {
      label: "New Document",
      navigateTo: "/documents/:templateId/:id",
      icon: "/icons/side-nav/new-document.svg",

      callbackFunction: () => {
        setIsCreateDocumentOpen(true);
      },
    },
    {
      label: "What's Prime?",
      navigateTo: "/info",
      icon: "/icons/base/info.svg",
    },
    {
      label: "Coming Soon!",
      navigateTo: "/coming-soon",
      icon: "/icons/base/book-marked.svg",
    },
  ];

  useEffect(() => {
    const splitHrefLength = window.location.href.split("/").length;
    const hiddenValue =
      (location.pathname.includes("/templates") && splitHrefLength === 5) ||
      (location.pathname.includes("/documents") && splitHrefLength === 6) ||
      location.pathname.includes("/auth") ||
      location.pathname.includes("/coming-soon") ||
      location.pathname.includes("/info");
    setIsHidden(hiddenValue);
  }, [location.pathname]);

  return (
    <div
      className={`md:w-2/5 lg:w-1/4 xl:w-1/5 bg-white h-screen left-0 top-0 bottom-0 flex-col items-center justify-between border-r ${
        isHidden ? "hidden" : "flex"
      }`}
    >
      <div>
        <div className="flex items-center justify-center h-[80px]">
          <p className="font-thin text-4xl justify-around md:flex w-full px-8 hidden">
            <span className="text-primary">P</span>
            <span>R</span>
            <span>I</span>
            <span>M</span>
            <span>E</span>
          </p>
        </div>

        <div className="lg:px-4 space-y-4 py-4 md:block hidden">
          {sideNavigationTabs.map((sideNavigationTab, index) => (
            <SideNavigationTab
              key={index}
              isTabActive={sideNavigationTab.isTabActive}
              navigateTo={sideNavigationTab.navigateTo}
              label={sideNavigationTab.label}
              icon={sideNavigationTab.icon}
              callbackFunction={sideNavigationTab.callbackFunction}
            />
          ))}
        </div>
      </div>

      {/* <p className="text-gray-400 py-8">
        version <span className="text-sm">1</span>
      </p> */}

      {isCreateDocumentOpen && (
        <CreateDocument
          user={auth.currentUser}
          isOpen={isCreateDocumentOpen}
          toggleDialog={() => setIsCreateDocumentOpen(false)}
        />
      )}
    </div>
  );
}
