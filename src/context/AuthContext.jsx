import { createContext, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const provider = new GoogleAuthProvider();
  let userRole;
  const handleGoogleSign = async (e) => {
    e.preventDefault();
    try {
      const fbauth = auth;
      const result = await signInWithPopup(fbauth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      if (user) {
        userRole =
          user.email === import.meta.env.VITE_LOGIN_EMAIL ? "Admin" : "User";
        user.role = userRole;
        console.log(user);
        setCurrentUser(user);
      } else {
        toast.error("Something Went Wrong", {});
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  const AuthContextValue = {
    handleGoogleSign,
    currentUser,
  };

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
