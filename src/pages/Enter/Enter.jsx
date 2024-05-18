import React, {useState, useContext, useEffect} from "react"
import "../../styles/EnterPage.css"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Context } from "../../context/Context"
function Enter() {
    const {isUserExists, setIsUserExists} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleCustomLogin = (e) => {
        e.preventDefault();
        if(email === "" || password === "") {
            toast.error("Please enter email and password", {
                position: 'top-right'
            });
            return;
        } else if (email === import.meta.env.VITE_LOGIN_EMAIL && password === import.meta.env.VITE_LOGIN_PASSWORD) {
                setIsUserExists(true);
                navigate("/chat");
        } else {
            toast.error("Invalid email or password", {
                position: 'top-right'
            });
            return;
        }
    }

    useEffect(() => {
        if(isUserExists) {
            navigate("/chat");
        }
        
    }, [navigate])

    return (
        <div class="content">
            <div class="flex-div">
                <div class="name-content">
                    <h1 class="logo">Gemini</h1>
                    <p>Get Answers to Your Questions easily by our ChatBot.</p>
                </div>
                <form onSubmit={handleCustomLogin}>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email..."  />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"  />
                    <button class="login">Log In</button>
                    <hr />
                    <button class="create-account">Enter to Gemini with Google</button>
                </form>
            </div>
        </div>
    )
}

export default Enter
