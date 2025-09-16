import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaPaperPlane, FaBars, FaTrash, FaUser, FaMicrophone } from "react-icons/fa";
import { RiRobot2Line, RiRobot3Fill } from "react-icons/ri";
import { TbRobot } from "react-icons/tb";
import "./ChatWindow.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Dummy chat list
const dummyChats = [
  { id: 1, title: "What's AI?", lastMessage: "Hello!", time: "10:30 AM" },
  { id: 2, title: "Team updates today", lastMessage: "How are you?", time: "11:15 AM" },
  { id: 3, title: "Random conversation start", lastMessage: "What's AI?", time: "12:05 PM" },
  { id: 4, title: "Hello!", lastMessage: "Random conversation.", time: "01:00 PM" },
  { id: 5, title: "How are you?", lastMessage: "Team updates.", time: "02:20 PM" },
  { id: 6, title: "Greetings", lastMessage: "Hello!", time: "10:30 AM" },
  { id: 7, title: "Check-in", lastMessage: "How are you?", time: "11:15 AM" },
  { id: 8, title: "AI Basics", lastMessage: "What's AI?", time: "12:05 PM" },
  { id: 9, title: "Random Talk", lastMessage: "Random conversation.", time: "01:00 PM" },
  { id: 10, title: "Team Updates", lastMessage: "Team updates.", time: "02:20 PM" },
  { id: 11, title: "Project Summary", lastMessage: "Project summary delivered.", time: "03:10 PM" },
  { id: 12, title: "Meeting Schedule", lastMessage: "Meeting scheduled at 4 PM.", time: "04:00 PM" },
  { id: 13, title: "Daily Standup", lastMessage: "Standup notes completed.", time: "04:45 PM" },
  { id: 14, title: "AI Suggestions", lastMessage: "Here are AI suggestions for you.", time: "05:30 PM" },
  { id: 15, title: "Fun Fact", lastMessage: "Did you know? AI can compose music!", time: "06:15 PM" },
  { id: 16, title: "Quick Tip", lastMessage: "Use Pomodoro technique for productivity.", time: "07:00 PM" },
  { id: 17, title: "New Updates", lastMessage: "Latest updates uploaded to the system.", time: "07:45 PM" },
  { id: 18, title: "Team Feedback", lastMessage: "Feedback collected from all members.", time: "08:20 PM" },
  { id: 19, title: "Technical Query", lastMessage: "AI explains how machine learning works.", time: "09:00 PM" },
  { id: 20, title: "Follow-up", lastMessage: "Following up on the previous discussion.", time: "09:30 PM" },
];

// Predefined static messages for chats
const chatHistories = {
  1: [
    { text: "Hello!", sender: "user" },
    { text: "Hi there! How can I help you today?", sender: "ai" },
    { text: "I wanted to check the latest updates.", sender: "user" },
    { text: "Sure! All tasks for today are on track.", sender: "ai" },
  ],
  2: [
    { text: "Hey, any updates from the team?", sender: "user" },
    { text: "Yes! Everyone submitted their reports on time.", sender: "ai" },
    { text: "Great, how are you doing?", sender: "user" },
    { text: "I’m doing well, thank you for asking!", sender: "ai" },
  ],
  3: [
    { text: "Let’s start a random conversation.", sender: "user" },
    { text: "Sounds fun! Do you know what AI is?", sender: "ai" },
    { text: "Kind of, but can you explain?", sender: "user" },
    { text: "Sure! AI is the simulation of human intelligence in machines.", sender: "ai" },
  ],
  4: [
    { text: "Hello!", sender: "user" },
    { text: "Hi! How’s your day going?", sender: "ai" },
    { text: "Pretty good, just relaxing.", sender: "user" },
    { text: "That’s nice! Random conversations are fun sometimes.", sender: "ai" },
  ],
  
  5: [
    { text: "How are you?", sender: "user" },
    { text: "I’m doing great! How about you?", sender: "ai" },
    { text: "Good too! Any updates from the team?", sender: "user" },
    { text: "Yes, everything is on schedule.", sender: "ai" },
  ],

  6: [
    { text: "Greetings!", sender: "user" },
    { text: "Hello there! Wishing you a productive day.", sender: "ai" },
  ],

  7: [
    { text: "Just checking in.", sender: "user" },
    { text: "Glad to hear from you. How are things going?", sender: "ai" },
    { text: "Good so far!", sender: "user" },
    { text: "That’s great to know!", sender: "ai" },
  ],

  8: [
    { text: "Can you explain the basics of AI?", sender: "user" },
    { text: "Of course! AI is about making machines learn and act smart.", sender: "ai" },
  ],

  9: [
    { text: "This is just a random talk.", sender: "user" },
    { text: "I like random talks! What’s on your mind?", sender: "ai" },
  ],

  10: [
    { text: "Give me today’s team updates.", sender: "user" },
    { text: "All updates are compiled and shared via email.", sender: "ai" },
  ],

  11: [
    { text: "Do you have the project summary?", sender: "user" },
    { text: "Yes, the summary was delivered at 3:10 PM.", sender: "ai" },
  ],

  12: [
    { text: "When’s the meeting scheduled?", sender: "user" },
    { text: "It’s set for 4 PM today.", sender: "ai" },
  ],

  13: [
    { text: "Daily standup done?", sender: "user" },
    { text: "Yes, notes have been completed and shared.", sender: "ai" },
  ],

  14: [
    { text: "Can you give me AI suggestions?", sender: "user" },
    { text: "Sure! How about automating repetitive reports?", sender: "ai" },
  ],

  15: [
    { text: "Tell me a fun fact.", sender: "user" },
    { text: "Did you know? AI can compose music like Mozart!", sender: "ai" },
  ],

  16: [
    { text: "Quick tip for productivity?", sender: "user" },
    { text: "Try the Pomodoro technique: 25 mins work, 5 mins break.", sender: "ai" },
  ],

  17: [
    { text: "Any new updates uploaded?", sender: "user" },
    { text: "Yes, the latest files are now in the system.", sender: "ai" },
  ],

  18: [
    { text: "Did we collect team feedback?", sender: "user" },
    { text: "Yes, feedback from all members has been compiled.", sender: "ai" },
  ],

  19: [
    { text: "I’ve got a technical query.", sender: "user" },
    { text: "Sure, ask me anything!", sender: "ai" },
    { text: "How does machine learning work?", sender: "user" },
    { text: "ML works by training algorithms on data to make predictions.", sender: "ai" },
  ],

  20: [
    { text: "Following up on the discussion.", sender: "user" },
    { text: "Yes, I remember. Do you want me to summarize?", sender: "ai" },
  ],
};

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [chats, setChats] = useState(dummyChats); 
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        { contents: [{ parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from model";

      const aiMessage = { text, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMsg = { text: "⚠️ Error fetching response.", sender: "ai" };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
    setInput("");
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput("");
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleSummarize = () => {
    if (messages.length === 0) return;

    const summary = messages
      .map((msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`)
      .join(" | ");

    setMessages((prev) => [
      ...prev,
      { text: `📝 Summary of this chat:\n${summary}`, sender: "ai" },
    ]);
  };

  const handleSmartReply = () => {
    setMessages((prev) => [
      ...prev,
      { text: "💡 Suggested Reply: 'That's interesting! Can you tell me more?'", sender: "ai" },
    ]);
  };

  const handleIcebreaker = () => {
    setMessages((prev) => [
      ...prev,
      { text: "👋 Hi! Nice to meet you. What's something fun about your day?", sender: "ai" },
    ]);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const loadChat = (chatId) => {
    const history = chatHistories[chatId] || [];
    setMessages(history);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChats(chats.filter(chat => chat.id !== chatId));
  };

  return (
    <div className="app-container">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <button className="new-chat-btn" onClick={handleNewChat}>
          <FaPlus /> New Chat
        </button>
        <button className="ai-btn" onClick={handleIcebreaker}>
          Generate Icebreaker
        </button>
        <h3 className="chat-list-title">Chat List</h3>
        <ul className="chat-list">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="chat-list-item"
              onClick={() => loadChat(chat.id)}
            >
              <div className="chat-item-content">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-last">{chat.lastMessage}</div>
                <div className="chat-time">{chat.time}</div>
              </div>
              <button 
                className="chat-delete-btn" 
                onClick={(e) => deleteChat(chat.id, e)}
                title="Delete chat"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main Chat */}
      <div className="chat-main">
        <h2 className="chat-header">Smart Team Chat AI <RiRobot2Line /></h2>

        {/* AI Buttons */}
        <div className="ai-buttons">
          <button className="ai-btn" onClick={handleSummarize}>
            Summarize Thread <TbRobot />
          </button>
          <button className="ai-btn" onClick={handleSmartReply}>
            Smart Reply Suggestion
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <h3 style={{textAlign:"center"}}>Welcome to Smart Team Chat AI < RiRobot3Fill /></h3>
              <br/>
              <p style={{textAlign:"center"}}>Start typing or use AI tools above to begin the conversation.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.sender === "user" ? "user" : "ai"} animate-message`}
            >
              {msg.sender === "user" ? (
                <>
                  <FaUser className="msg-icon" /> {msg.text}
                </>
              ) : (
                <>
                  <RiRobot2Line className="msg-icon" /> {msg.text}
                </>
              )}
            </div>
          ))}

          {loading && (
            <div className="chat-bubble loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="voice-btn" title="Voice Input">
            <FaMicrophone />
          </button>
          <button className="chat-send-btn" onClick={sendMessage} disabled={loading}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
