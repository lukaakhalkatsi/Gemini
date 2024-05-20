import React, { useContext, useState } from "react"
import '../../styles/Sidebar.css'
import {assets} from "../../assets/assets"
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const { handleNewChat, setIsUserExists, history } = useContext(Context);
    const [extended, setExtended] = useState(false);
    const navigate = useNavigate();


    const handleAdminLogOut = () => {
        localStorage.clear();
        setIsUserExists(false);
        navigate("/");
    }


    return (
        <div className={`sidebar ${extended ? "extended" : ""}`}>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
                <div className="new-chat" onClick={handleNewChat}>
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                <div className="recent">
                    <p className="recent-title">Recent</p>
                        {history?.map((item, index) => (
                            <div className="recent-entry" key={index}>
                                <img src={assets.message_icon} alt="" />
                                <p>{item.prompt.length > 12 ? item.prompt.substring(0, 12) + "..." : item.prompt}</p>
                            </div>
                        ))}
                </div> : null}
            </div>
            <div className="bottom">
                <a target="_blank" href="https://support.gemini.com/hc/en-us">
                    <div className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="" />
                        {extended ? <p>Help</p> : null}
                    </div>
                </a>
                <a target="_blank" href="https://support.google.com/gemini/answer/13278892?hl=en&co=GENIE.Platform%3DAndroid">
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {extended ? <p>Activity</p> : null}
                    </div>
                </a>
                <div className="bottom-item recent-entry" onClick={handleAdminLogOut}>
                    <img src={assets.logout_icon} alt="" />
                    {extended ? <p>Log Out</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
