import { useLocation, useNavigate } from "react-router-dom";
import { signOutHandler } from "../firebase/auth";
import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import BaseMenu from "./base/BaseMenu";
import SideNavigationTab from "./layout/sidebar/SideNavigationTab";
import { v4 as uuidv4 } from "uuid";
import CreateDocument from "./dialogs/documents/CreateDocument";
import ViewProfile from "./dialogs/profile/ViewProfile";

export default function Navbar() {
  const location = useLocation();
  const auth = useAuthContext();
  const navigate = useNavigate();

  const routeToTitleMap = {
    "/dashboard": "My Dashboard",
    "/documents": "All Documents",
    "/templates": "My Templates",
  };

  const [isHidden, setIsHidden] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewProfileOpen, setViewProfileOpen] = useState(false);
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);

  const getUserData = async () => {
    setUserData(auth.currentUser);
  };

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

  useEffect(() => {
    getUserData();
  }, []);

  const signoutFunc = async () => {
    const res = await signOutHandler();
    navigate("/auth");
  };

  const openViewProfile = async () => {
    setViewProfileOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const sideNavigationTabs = [
    {
      label: "Dashboard",
      navigateTo: "/dashboard",
      icon: "/icons/side-nav/home.svg",
      isTabActive: location.pathname.includes("/dashboard"),
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
      },
    },
    {
      label: "Documents",
      navigateTo: "/documents",
      icon: "/icons/side-nav/documents.svg",
      isTabActive: location.pathname.includes("/documents"),
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
      },
    },
    {
      label: "Templates",
      navigateTo: "/templates",
      icon: "/icons/side-nav/templates.svg",
      isTabActive: location.pathname.includes("/templates"),
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
      },
    },
    {
      label: "Build a Template",
      navigateTo: `/templates/${uuidv4()}`,
      icon: "/icons/side-nav/build-template.svg",
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
      },
    },
    {
      label: "New Document",
      navigateTo: "/documents/:templateId/:id",
      icon: "/icons/side-nav/new-document.svg",
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
        setIsCreateDocumentOpen(true);
      },
    },
    {
      label: "What's Prime?",
      navigateTo: "/info",
      icon: "/icons/base/info.svg",
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
      },
    },
    {
      label: "Coming Soon!",
      navigateTo: "/coming-soon",
      icon: "/icons/base/book-marked.svg",
      callbackFunction: () => {
        setIsMenuOpen(!isMenuOpen);
      },
    },
  ];

  return (
    <div
      className={`w-full bg-white h-[80px] border-b ${
        isHidden ? "hidden" : ""
      } items-center justify-between flex  px-8`}
    >
      <div className="space-x-4 flex">
        <div className="md:hidden flex">
          <button className="border-none p-0" onClick={toggleMenu}>
            <img src="/icons/base/menu.svg" />
          </button>
        </div>
        <p className="text-2xl">{routeToTitleMap[location.pathname]}</p>
      </div>
      {userData && (
        <div className="items-center space-x-2 flex">
          <div className="flex space-x-2 items-center">
            {/* <img
              className="h-9 w-9"
              src="/icons/base/user/circle-user-round.svg"
            /> */}
            <div className="">
              <p className="text-lg text-black hidden md:block">
                Hello, {userData?.basicInformation.firstName}
              </p>
              <img
                src="/icons/base/user/circle-user-round.svg"
                className="h-8 w-8 md:hidden"
              />
            </div>
          </div>
          <BaseMenu
            iconSrc="/icons/navbar/chevron-down.svg"
            iconContainerClass="cursor-pointer flex items-center rounded-full "
          >
            <div>
              <button
                onClick={openViewProfile}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none"
              >
                View Profile
              </button>
            </div>
            <div>
              <button
                onClick={signoutFunc}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-none text-red-600"
              >
                Sign Out
              </button>
            </div>
          </BaseMenu>
        </div>
      )}

      <div
        ref={menuRef}
        className={`h-[100vh] fixed top-0 bottom-0 w-[90%] bg-white transition-all ease-in-out duration-500 md:hidden flex flex-col z-10 ${
          isMenuOpen ? "left-0" : "left-[-900px]"
        }`}
      >
        <div className="flex justify-between w-full px-8 py-6 ">
          <div className="font-semibold text-2xl flex items-center">Menu</div>
          <button onClick={toggleMenu} className="border-none">
            <img src="/icons/base/cancel.svg" className="h-8 w-8" />
          </button>
        </div>

        {sideNavigationTabs.map((sideNavigationTab, index) => (
          <SideNavigationTab
            key={index}
            isTabActive={false}
            navigateTo={sideNavigationTab.navigateTo}
            label={sideNavigationTab.label}
            icon={sideNavigationTab.icon}
            callbackFunction={() => {
              sideNavigationTab.callbackFunction?.();
            }}
          />
        ))}
      </div>
      {isCreateDocumentOpen && (
        <CreateDocument
          user={auth.currentUser}
          isOpen={isCreateDocumentOpen}
          toggleDialog={() => setIsCreateDocumentOpen(false)}
        />
      )}
      {viewProfileOpen && (
        <ViewProfile
          user={auth.currentUser}
          isOpen={viewProfileOpen}
          toggleDialog={() => setViewProfileOpen(false)}
        />
      )}
    </div>
  );
}
