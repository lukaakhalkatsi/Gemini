import { createContext, useState } from "react";
import run from "../config/gemini";
import toast from "react-hot-toast"

export const Context = createContext();

const ContextProvider = ({children}) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const handleNewChat = () => {
        setShowResult(false);
        setInput("");
        setRecentPrompt("");
    }

    const onSent = async (prompt) => {
        try {
            setLoading(true);
            setShowResult(true);
            setRecentPrompt(prompt);
            const response = await run(prompt);
            let responseArray = response.split("**");
            let newResponse;
            for(let i = 0; i < responseArray.length; i++) {
                if(i === 0 || i % 2 !== 1) {
                    newResponse+= responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            };
            let newResponse2 = newResponse.split("*").join("</br>");
            setResultData(newResponse2);
            setInput("");
        } catch {
            toast.error("Something went wrong while generating the answer. Please try again.", {
                position: 'top-center'
            })
        } finally {
            setLoading(false);
        }
    }

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
        handleNewChat
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider