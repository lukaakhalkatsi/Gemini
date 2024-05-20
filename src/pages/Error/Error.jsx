import React from "react"
import {useNavigate} from "react-router-dom"
import "../../styles/ErrorPage.css"

function Error() {
    const navigate = useNavigate();

    const handleNavigateToChat = () => {
        navigate("/chat");
    }

    return (
    <div class="container">
        <div class="gif">
            <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
        </div>
        <div class="content">
            <h1 class="main-heading">An error occured</h1>
            <p className="error-text">
                Sorry for misundererstanding.
            </p>
            <button className="return-btn" onClick={handleNavigateToChat}>Back to chat</button>
        </div>
    </div>
    )
}

export default Error
