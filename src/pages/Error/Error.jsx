import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ErrorPage.css";

function Error() {
  const navigate = useNavigate();

  const handleNavigateToChat = () => {
    navigate("/chat");
  };

  return (
    <div class="error-container">
      <div class="error-gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div class="error-content">
        <h1 class="error-heading">An error occured</h1>
        <p className="error-text">Sorry for misundererstanding.</p>
        <button className="return-btn" onClick={handleNavigateToChat}>
          Back to chat
        </button>
      </div>
    </div>
  );
}

export default Error;
