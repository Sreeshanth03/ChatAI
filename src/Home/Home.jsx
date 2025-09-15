import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaComments } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleChat = () => {
        navigate("/chat");
    };

    const handleFree = () => {
        alert("Redirect to free trial signup!");
    };

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Smart Team Chat UI</h1>
                <p className="quote">"Smart chat for smarter teams."</p>
                <p className="description">
                    Collaborate seamlessly with your team. Chat, share ideas, and boost productivity with our intuitive AI-powered chat platform.
                </p>
                <div className="button-group">
                    <button className="chat-btn" onClick={handleChat}>
                        <FaComments className="icon"/> Open Chat
                    </button>
                    <button className="free-btn" onClick={handleFree}>
                        <FaRocket className="icon"/> Try for Free
                    </button>
                </div>
            </div>
            <div className="home-image">
                <img src="https://bluespacetech.com/wp-content/uploads/2024/02/AI-chatbord.png" alt="AI Chat" />
            </div>
        </div>
    );
};

export default Home;
