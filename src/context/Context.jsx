import { createContext, useState } from "react";
import run from "../config/gemini";
import toast from "react-hot-toast"

export const Context = createContext();

const ContextProvider = ({children}) => {

    const [isUserExists, setIsUserExists] = useState(false);

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [messages, setMessages] = useState([]);

    const handleNewChat = () => {
        setShowResult(false);
        setInput("");
        setRecentPrompt("");
    }

    const addUserMessage = (content) => {
        const userMessage = {
            content,
            role: "user"
        }
    
        setMessages(prevMessages => [...prevMessages, userMessage]);
    }
    
    const addBotMessage = (content) => {
        const botMessage = {
            content,
            role: "assistant"
        }
    
        setMessages(prevMessages => [...prevMessages, botMessage]);
    }
    

    const onSent = async (prompt) => {
        try {
            addUserMessage(prompt);
            setLoading(true);
            setShowResult(true);
            // setRecentPrompt(prompt);
            const response = await run(prompt);
            let responseArray = response.split("**");
            let newResponse = "";
            for(let i = 0; i < responseArray.length; i++) {
                if(i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>");
            // setResultData(newResponse2);
            setInput("");
            addBotMessage(newResponse2);
        } catch {
            toast.error("Something went wrong while generating the answer. Please try again.", {
                position: 'top-center'
            });
        } finally {
            setLoading(false);
        }
    }

    console.log(messages);
    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        handleNewChat,
        isUserExists,
        setIsUserExists,
        messages,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider