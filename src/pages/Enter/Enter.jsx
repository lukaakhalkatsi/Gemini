import React, { useState, useContext, useEffect } from "react";
import "../../styles/EnterPage.css";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

function Enter() {
    const { isUserExists, setIsUserExists } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleCustomLogin = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            toast.error("Please enter email and password", {
                position: 'top-right'
            });
        } else if (email === import.meta.env.VITE_LOGIN_EMAIL && password === import.meta.env.VITE_LOGIN_PASSWORD) {
            setIsUserExists(true);
            localStorage.setItem("isUserExists", "true"); // Store authentication status
        } else {
            toast.error("Invalid email or password", {
                position: 'top-right'
            });
        }
    };

    useEffect(() => {
        const storedIsUserExists = localStorage.getItem("isUserExists");
        if (storedIsUserExists === "true") {
            setIsUserExists(true);
        }
    }, []);

    useEffect(() => {
        if (isUserExists) {
            navigate("/chat");
        }
    }, [isUserExists, navigate]);

    return (
        <div className="content">
            <div className="flex-div">
                <div className="name-content">
                    <h1 className="logo">Gemini</h1>
                    <p>Get Answers to Your Questions easily by our ChatBot.</p>
                </div>
                <form onSubmit={handleCustomLogin}>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Email..." />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button className="login">Log In</button>
                    <hr />
                    <button className="create-account">Enter to Gemini with Google</button>
                </form>
            </div>
        </div>
    );
}

export default Enter;
