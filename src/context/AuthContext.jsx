import React, { createContext, useState, useEffect, useContext } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { Context } from "./Context";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { sendTotalAttempts } = useContext(Context);
  const provider = new GoogleAuthProvider();
  const fbauth = auth;
  provider.setCustomParameters({
    prompt: "select_account",
  });
  let userRole;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbauth, (user) => {
      if (user) {
        userRole =
          user.email === import.meta.env.VITE_LOGIN_EMAIL ? "Admin" : "User";
        user.role = userRole;
        setCurrentUser(user);
        localStorage.setItem("userToken", user.accessToken);
      } else {
        setCurrentUser(null);
        localStorage.removeItem("userToken");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSign = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(fbauth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      if (user) {
        localStorage.setItem("sendTotalAttempts", sendTotalAttempts);
        userRole =
          user.email === import.meta.env.VITE_LOGIN_EMAIL ? "Admin" : "User";
        user.role = userRole;
        setCurrentUser(user);
        localStorage.setItem("userToken", token);
      } else {
        toast.error("Something Went Wrong", {});
      }
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  const logOut = async () => {
    await signOut(fbauth);
  };

  const AuthContextValue = {
    handleGoogleSign,
    currentUser,
    logOut,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
