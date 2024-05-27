import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";
import toast from "react-hot-toast";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [sendTotalAttempts, setSendTotalAttempts] = useState(10);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [isSendDisabled, setIsSendDisabled] = useState(false);

  useEffect(() => {
    const storedAttempts = localStorage.getItem("sendTotalAttempts");
    if (storedAttempts !== null) {
      setSendTotalAttempts(parseInt(storedAttempts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sendTotalAttempts", sendTotalAttempts);
  }, [sendTotalAttempts]);

  const handleNewChat = () => {
    setShowResult(false);
    setInput("");
    setMessages([]);
  };

  const addUserMessage = (content) => {
    const userMessage = {
      content,
      role: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
  };

  const addBotMessage = (content) => {
    const botMessage = {
      content,
      role: "assistant",
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const updateHistory = (newPrompt) => {
    setHistory((prevHistory) => [...prevHistory, newPrompt]);
  };

  const onSent = async (prompt) => {
    if (prompt === "") {
      toast.error("Please enter a prompt", {});
      return;
    }
    try {
      setLoading(true);
      setIsSendDisabled(true);
      addUserMessage(prompt);
      setShowResult(true);
      setInput("");
      const response = await run(prompt);
      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      if (response) {
        setSendTotalAttempts((prevNumber) => prevNumber - 1);
        setIsSendDisabled(false);
      }
      addBotMessage(newResponse2);
      if (messages.length === 0) {
        updateHistory({ prompt });
      }
    } catch {
      toast.error(
        "Something went wrong while generating the answer. Please try again.",
        {
          position: "top-center",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    onSent,
    showResult,
    loading,
    input,
    setInput,
    handleNewChat,
    messages,
    history,
    sendTotalAttempts,
    setSendTotalAttempts,
    isSendDisabled,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
