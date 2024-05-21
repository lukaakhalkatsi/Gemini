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
      <div className="flex-div">
        <div className="name-content">
          <h1 className="logo">Gemini</h1>
          <p>Get Answers to Your Questions easily by our ChatBot.</p>
        </div>
        <form>
          <input type="text" placeholder="Enter Email..." disabled />
          <input type="password" placeholder="Password" disabled />
          <button disabled className="login">
            Log In
          </button>
          <hr />
          <button className="google" onClick={handleGoogleSign}>
            Enter to Gemini with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Enter;
