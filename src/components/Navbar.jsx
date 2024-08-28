import { useLocation, useNavigate } from "react-router-dom";
import { signOutHandler } from "../firebase/auth";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import BaseMenu from "./base/BaseMenu";

export default function Navbar() {
  const location = useLocation();
  const auth = useAuthContext();
  const navigate = useNavigate();

  const routeToTitleMap = {
    "/dashboard": "My Dashboard",
    "/documents": "All Documents",
    "/templates": "My Templates",
  };

  const [isHidden, setIsHidden] = useState();
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    setUserData(auth.currentUser);
  };

  useEffect(() => {
    const splitHrefLength = window.location.href.split("/").length;
    const hiddenValue =
      (location.pathname.includes("/templates") && splitHrefLength === 5) ||
      (location.pathname.includes("/documents") && splitHrefLength === 6) ||
      location.pathname.includes("/auth");
    setIsHidden(hiddenValue);
  }, [location.pathname]);

  useEffect(() => {
    getUserData();
  }, []);

  const signoutFunc = async () => {
    const res = await signOutHandler();
    navigate("/auth");
  };
  return (
    <div
      className={`w-full bg-white h-[80px] border-b ${
        isHidden ? "hidden" : ""
      } items-center flex justify-between px-8`}
    >
      <p className="text-2xl">{routeToTitleMap[location.pathname]}</p>

      {userData && (
        <div className="items-center space-x-2 flex">
          <div className="flex space-x-2 items-center">
            {/* <img
              className="h-9 w-9"
              src="/icons/base/user/circle-user-round.svg"
            /> */}
            <p className="text-lg text-black">
              {userData?.basicInformation.firstName}
            </p>
          </div>
          <BaseMenu
            iconSrc="/icons/navbar/chevron-down.svg"
            iconContainerClass="cursor-pointer flex items-center rounded-full "
          >
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
    </div>
  );
}
