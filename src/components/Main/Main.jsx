import React, { useContext, useRef, useEffect, useState } from "react";
import "../../styles/Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { cardsData } from "../../assets/cardsData/data";
import { AuthContext } from "../../context/AuthContext";

function Main() {
  const {
    onSent,
    showResult,
    loading,
    setInput,
    input,
    messages,
    sendTotalAttempts,
    isSendDisabled,
  } = useContext(Context);
  const { currentUser } = useContext(AuthContext);
  const chatContainerRef = useRef(null);
  const [attempsLeft, setAttempsLeft] = useState(sendTotalAttempts);

  useEffect(() => {
    setAttempsLeft(sendTotalAttempts);
  }, [sendTotalAttempts]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      onSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>
          Gemini - <span className="email">{currentUser.email}</span> |{" "}
          <span className="user">{currentUser.role}</span>
        </p>
      </div>
      <div className="chat-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {currentUser.displayName.split(" ")[0]}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {cardsData.map((card, index) => (
                <div
                  className={`card ${
                    currentUser.role === "User" && attempsLeft <= 0
                      ? "none"
                      : ""
                  }`}
                  key={index}
                  onClick={() => onSent(card.text)}
                >
                  <p>{card.text}</p>
                  <img src={card.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="result" ref={chatContainerRef}>
            {messages.map((message, index) =>
              message.role === "user" ? (
                <div className="result-title" key={index}>
                  <img src={currentUser.photoURL} alt="user" />
                  <p>{message.content}</p>
                </div>
              ) : (
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="gemini" />
                  <pre
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  ></pre>
                  {/* {loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <pre
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></pre>
                  )} */}
                </div>
              )
            )}
          </div>
        )}
        <div className="attemps-container">
          {currentUser.role === "User" ? (
            attempsLeft > 0 ? (
              <p>
                You have {attempsLeft} attempt{attempsLeft !== 1 ? "s" : ""}{" "}
                left.
              </p>
            ) : (
              <p>No attempts left.</p>
            )
          ) : (
            <p>Admin</p>
          )}
        </div>

        <div className="main-bottom">
          <div className="search-container">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here..."
              onKeyDown={handleEnterClick}
              disabled={
                (currentUser.role === "User" && attempsLeft <= 0) ||
                isSendDisabled
              }
            />
            <div>
              <img
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
          <p className="chat-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy & Gemini Apps
          </p>
        </div>
      </div>
      <button className="text-btn">T</button>
    </div>
  );
}

export default Main;
