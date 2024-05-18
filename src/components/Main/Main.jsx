import React, { useContext } from "react"
import '../../styles/Main.css'
import { assets } from "../../assets/assets"
import { Context } from "../../context/Context"

const cardsData = [
    { icon: assets.compass_icon, text: 'Create a futuristic image of a car' },
    { icon: assets.bulb_icon, text: 'Give me some ideas to surprise my concert-loving friend on their birthday.' },
    { icon: assets.message_icon, text: 'What’s the reaction to and impact of autonomous vehicles' },
    { icon: assets.code_icon, text: "What's the time it takes to walk to several landmarks" }
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
