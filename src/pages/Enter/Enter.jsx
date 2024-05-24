import React, { useContext, useEffect } from "react";
import "../../styles/EnterPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Enter() {
  const { handleGoogleSign, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/chat");
    }
  }, [currentUser]);

  return (
    <div className="content">
      <div className="main-content">
        <form className="enter-form">
          <button className="google" onClick={handleGoogleSign}>
            Enter to Gemini with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Enter;
