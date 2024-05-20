import React, { useContext } from "react"
import '../../styles/Main.css'
import { assets } from "../../assets/assets"
import { Context } from "../../context/Context"
import { cardsData } from "../../assets/cardsData/data"

function Main() {

    const {onSent, showResult, loading, setInput, input, messages} = useContext(Context);

    const handleEnterClick = (e) => {
        if (e.key === 'Enter') {
            onSent(input);
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
            </div>
            <div className="main-container">
                {!showResult
                ?
                <>
                <div className="greet">
                    <p><span>Hello, Admin.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    {
                    cardsData.map((card, index) => (
                        <div className="card" key={index} onClick={() => onSent(card.text)}>
                            <p>{card.text}</p>
                            <img src={card.icon} alt="" />
                        </div>
                    ))
                    }
                </div>
                </>
                :
                <div className="result">
                    {messages.map((message, index) => (
                        message.role === "user" ? (
                            <div className="result-title" key={index}>
                                <img src={assets.user_icon} alt="" />
                                <p>{message.content}</p>
                            </div>
                        ) : (
                        <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                            {loading ? <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div> : <pre dangerouslySetInnerHTML={{__html: message.content}}></pre>}
                        </div>
                        )
                    ))}
                </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) =>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" onKeyDown={handleEnterClick} />
                        <div>
                            <img onClick={() => onSent(input)} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
