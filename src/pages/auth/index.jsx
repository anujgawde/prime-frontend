import { useEffect, useState } from "react";
import BaseButton from "../../components/base/BaseButton";
import BaseInput from "../../components/base/BaseInput";

import {
  signInWithEmailAndPasswordHandler,
  createUserWithEmailAndPasswordHandler,
} from "../../firebase/auth";
import { createUser } from "../../api/users";

import React from "react";
import BaseDialog from "../../components/base/BaseDialog";
import { useNavigate } from "react-router-dom";
import BaseLoader from "../../components/base/BaseLoader";

export default function AuthPage() {
  const navigate = useNavigate();
  // Variables:
  const [isNewUser, setIsNewUser] = useState(true);
  const [dialog, setDialog] = useState({
    state: false,
    content: "",
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    fullName: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });
  const [existingUserData, setExistingUserData] = useState({
    email: null,
    password: null,
  });

  // Functions:
  const signupHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (newUserData.confirmPassword !== newUserData.password) {
        setDialog({
          state: true,
          content: "Passwords don't match",
          title: "Something went wrong!",
        });
        return;
      }
      const signupResponse = await createUserWithEmailAndPasswordHandler(
        newUserData.email,
        newUserData.password
      );
      const res = await createUser({
        _id: signupResponse.user.uid,
        basicInformation: {
          firstName: newUserData.fullName?.split(" ")[0],
          lastName: newUserData.fullName?.split(" ")[1] ?? "",
          email: newUserData.email,
        },
        contactInformation: {
          address: null,
          phoneNumber: newUserData.phone,
        },
        rolePermissions: {
          role: "admin",
          permissions: ["edit", "view"],
        },
        employmentDetails: {
          department: null,
          employeeId: "",
        },
      });
      window.location.reload();
      navigate("/");
      setIsLoading(false);
    } catch (e) {
      // Open Dialog Here
      console.log("now error", e);
      setDialog({
        state: true,
        content: "Please check if all the fields entered are correct!",
        title: "Something went wrong!",
      });
    }
  };

  const signInHandler = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const signInResponse = await signInWithEmailAndPasswordHandler(
        existingUserData.email,
        existingUserData.password
      );
      window.location.reload();
      navigate("/");
      setIsLoading(false);
    } catch (e) {
      console.log("now error", e);
      setDialog({
        state: true,
        content: "Please check if all the fields entered are correct!",
        title: "Something went wrong!",
      });
    }
  };

  const updateFormDataHandler = (event, inputKey) => {
    if (isNewUser) {
      setNewUserData((prevState) => ({
        ...prevState,
        [`${inputKey}`]: event.target.value,
      }));
    } else {
      setExistingUserData((prevState) => ({
        ...prevState,
        [`${inputKey}`]: event.target.value,
      }));
    }
  };

  useEffect(() => {
    setDialog({
      state: true,
      content:
        "Due to some undergoing changes in the software, the application may take some time to render.",
      title: "Notice",
    });
  }, []);

  const toggleDialog = () => {
    setDialog((prevState) => ({
      ...prevState,
      state: !prevState.state,
    }));
  };

  return (
    <>
      <div className="h-screen w-full bg-white flex items-center justify-center">
        {isLoading ? (
          <BaseLoader />
        ) : (
          <div
            className={`${
              isLoading && "hidden"
            } mx-4 md:mx-8 w-full md:w-2/3 xl:w-1/3 border-0 md:border rounded-xl md:px-8 py-12 space-y-4 md:space-y-4 bg-white flex-col flex items-center`}
          >
            <p className="text-4xl font-thin text-center">
              Prime Reports
              {/* <span className="italic">Org</span> */}
            </p>
            <BaseInput
              name="fullName"
              isHidden={!isNewUser}
              placeHolder="John Doe"
              label="Full Name"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "fullName")}
              type={undefined}
            />
            <BaseInput
              name="email"
              placeHolder="johndoe@placeholder.com"
              label="Email"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "email")}
              type={undefined}
              isHidden={undefined}
            />
            <BaseInput
              name="phone"
              isHidden={!isNewUser}
              placeHolder="+91 9999999999"
              label="Phone"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "phone")}
              type={undefined}
            />
            <BaseInput
              name="password"
              placeHolder="Must have at least 6 characters"
              label="Password"
              errorText=""
              onChange={(event) => updateFormDataHandler(event, "password")}
              type="password"
              isHidden={undefined}
            />
            <BaseInput
              name="confirmPassword"
              isHidden={!isNewUser}
              placeHolder=""
              label="Confirm Password"
              errorText=""
              onChange={(event) =>
                updateFormDataHandler(event, "confirmPassword")
              }
              type={undefined}
            />
            <BaseButton
              customClasses="w-full"
              buttonText={isNewUser ? `Sign Up` : `Sign In`}
              onClick={isNewUser ? signupHandler : signInHandler}
              type={undefined}
            />
            {!isNewUser ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={() => setIsNewUser(!isNewUser)}
                >
                  Sign Up!
                </span>
              </p>
            ) : (
              <p>
                Already a user?{" "}
                <span
                  className="cursor-pointer underline"
                  onClick={() => setIsNewUser(!isNewUser)}
                >
                  Sign in!
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      <BaseDialog
        title={dialog.title}
        contentContainerClasses="py-4 text-xs md:text-l"
        toggleDialog={toggleDialog}
        isOpen={dialog.state}
        text={dialog.content}
      />
    </>
  );
}
