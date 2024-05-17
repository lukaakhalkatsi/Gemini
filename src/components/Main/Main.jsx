import React, { useContext } from "react"
import "./Main.css"
import { assets } from "../../assets/assets"
import { Context } from "../../context/Context"

const cardsData = [
    { icon: assets.compass_icon, text: 'Suggest beautiful places to see on an upcoming road trip' },
    { icon: assets.bulb_icon, text: 'Suggest beautiful places to see on an upcoming road trip' },
    { icon: assets.message_icon, text: 'Suggest beautiful places to see on an upcoming road trip' },
    { icon: assets.code_icon, text: 'Suggest beautiful places to see on an upcoming road trip' }
  ];

function Main() {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);

    const handleEnterClick = (e) => {
        if (e.key === 'Enter') {
            onSent(input);
        }
    };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult
                ?
                <>
                <div className="greet">
                    <p><span>Hello, Luka.</span></p>
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
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ?
                        <div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <pre dangerouslySetInnerHTML={{__html: resultData}}></pre>
                        }
                    </div>
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
