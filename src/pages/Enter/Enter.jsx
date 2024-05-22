import React, { useContext, useEffect } from "react";
import "../../styles/EnterPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Typewriter from "typewriter-effect";

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
        <div className="name-content">
          <h1 className="logo">Gemini</h1>
          <p>
            <Typewriter
              options={{
                strings: [
                  "Get Answers to Your Questions easily by our ChatBot.",
                  "Need quick answers? Chat with our AI-powered assistant!",
                  "Say goodbye to long waits! Chat with our ChatBot for instant help!",
                  "Unlock a world of knowledge with our ChatBot at your service!",
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 20,
              }}
            />
          </p>
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
