// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import GreetingMessage from "./Greeting";
// import Chatbot from "./Chatbot";
// import Health from "./Health";
// import News from "./News";
// import "./Main.css";

// function Main() {
//   const navigate = useNavigate();
//   const [showChatbot, setShowChatbot] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
 
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setDarkMode(savedTheme === "dark");
//     } else {
//       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       setDarkMode(prefersDark);
//     }
//   }, []);

//  useEffect(() => {
//   const root = document.documentElement;

//   if (darkMode) {
//     document.body.classList.add('dark-mode');
//     root.classList.add('dark-mode');
//     localStorage.setItem("theme", "dark");
//   } else {
//     document.body.classList.remove('dark-mode');
//     root.classList.remove('dark-mode');
//     localStorage.setItem("theme", "light");
//   }
// }, [darkMode]);


//   const toggleChatbot = () => setShowChatbot(prev => !prev);
//   const toggleTheme = () => setDarkMode(prev => !prev);
// const foodFacts = [
//   "Carrots were originally purple in color.",
//   "Apples float because 25% of their volume is air.",
//   "Honey never spoils — archaeologists found 3,000-year-old honey in Egyptian tombs!",
//   "Bananas are berries, but strawberries aren't.",
//   "Tomatoes were once thought to be poisonous in Europe.",
//   "Dark chocolate contains antioxidants that may improve heart health.",
//   "Mushrooms are more closely related to animals than plants.",
//   "Ketchup was once sold as medicine in the 1830s.",
// ];
// const randomFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];

//   return (
    
//     <div className="main-page">
//       <div className="header-section">
//         <div className="typewriter">
//   <h1 className="main-title">Snap Detect Eat</h1>
// </div>

//         <GreetingMessage />
//       </div>

//       <div className="button-container">
//         <button onClick={() => navigate("/detect")} className="nav-button detect-btn">
//           📸 Snap & 🍽️ Detect
//         </button>

//         <button onClick={() => navigate("/weather")} className="nav-button weather-btn">
//            🌤️ Weather-Based Picks
//         </button>

//         <button onClick={() => navigate("/health")} className="nav-button health-btn">
//           🍏 Wellness Picks
//         </button>

//         <button onClick={() => navigate("/news")} className="nav-button news-btn">
//            📰 Food Buzz & Trends
//         </button>
//       </div>

//       <button
//         onClick={toggleChatbot}
//         className={`chatbot-toggle ${showChatbot ? "active" : ""}`}
//       >
//         {showChatbot ? "✕ Close" : "💬 Food Assistant"}
//       </button>

//       {showChatbot && (
//         <div className="chatbot-container">
//           <Chatbot />
//         </div>
//       )}

//       <div className="theme-toggle-container" style={{ position: "fixed", top: 20, right: 20, zIndex: 1001 }}>
//         <button onClick={toggleTheme} className="theme-toggle">
//           {darkMode ? '☀️' : '🌙'}
//         </button>
//       </div>
//  <div className="fact" >
//   <span style={{ 
//     marginRight: '8px',
//     fontSize: '18px'
//   }}>🍽️</span>
//   <strong style={{ color: darkMode ? '#4CAF50' : '#2196F3' }}>Food Fact:</strong> {randomFact}
// </div>
//     </div>
//   );
// }

// export default Main;
  
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GreetingMessage from "./Greeting";
import Chatbot from "./Chatbot";
import Health from "./Health";
import News from "./News";
import "./Main.css";

function Main() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      document.body.classList.add('dark-mode');
      root.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove('dark-mode');
      root.classList.remove('dark-mode');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleChatbot = () => setShowChatbot(prev => !prev);
  const toggleTheme = () => setDarkMode(prev => !prev);
  
  const foodFacts = [
    "Carrots were originally purple in color.",
    "Apples float because 25% of their volume is air.",
    "Honey never spoils — archaeologists found 3,000-year-old honey in Egyptian tombs!",
    "Bananas are berries, but strawberries aren't.",
    "Tomatoes were once thought to be poisonous in Europe.",
    "Dark chocolate contains antioxidants that may improve heart health.",
    "Mushrooms are more closely related to animals than plants.",
    "Ketchup was once sold as medicine in the 1830s.",
  ];
  const randomFact = foodFacts[Math.floor(Math.random() * foodFacts.length)];

  return (
    <div className="main-page">
      <div className="header-section">
        <div className="typewriter">
          <h1 className="main-title">Snap Detect Eat</h1>
        </div>
        <GreetingMessage />
      </div>

      <div className="button-container">
        <button onClick={() => navigate("/detect")} className="nav-button detect-btn">
          📸 Snap & 🍽️ Detect
        </button>

        <button onClick={() => navigate("/weather")} className="nav-button weather-btn">
           🌤️ Weather-Based Picks
        </button>

        <button onClick={() => navigate("/health")} className="nav-button health-btn">
          🍏 Wellness Picks
        </button>

        <button onClick={() => navigate("/news")} className="nav-button news-btn">
           📰 Food Buzz & Trends
        </button>
      </div>

      <button
        onClick={toggleChatbot}
        className={`chatbot-toggle ${showChatbot ? "active" : ""}`}
      >
        {showChatbot ? "✕ Close" : "💬 Food Assistant"}
      </button>

      {showChatbot && (
        <div className="chatbot-container">
          <Chatbot />
        </div>
      )}

      <div
  style={{
    position: "fixed",
    top:"15%",
    right: "3px",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 1000
  }}
>
  <button 
    onClick={toggleTheme} 
    className="theme-toggle"
    style={{
      padding: "8px",
      borderRadius: "20px",
      border: "none",
      background: darkMode ? "#444" : "#eee",
      color: darkMode ? "#fff" : "#333",
      cursor: "pointer",
      fontWeight: "bold",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {darkMode ? '☀️' : '🌙'}
  </button>

  <button 
      className="info-button"
      onClick={() => navigate('/about')}
      style={{
        padding: "8px",
        borderRadius: "20px",
        border: "none",
        background: darkMode ? "#444" : "#eee",
        color: darkMode ? "#fff" : "#333",
        cursor: "pointer",
        fontWeight: "bold",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      ℹ️
    </button>
  <button 
    onClick={() => alert("About the Author:\nThis app was created by [Your Name], a food and tech enthusiast passionate about combining nutrition with technology to make healthy eating easier and more accessible for everyone.")} 
    className="info-button"
    style={{
      padding: "8px",
      borderRadius: "20px",
      border: "none",
      background: darkMode ? "#444" : "#eee",
      color: darkMode ? "#fff" : "#333",
      cursor: "pointer",
      fontWeight: "bold",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    👨‍💻
  </button>
</div>


      <div className="fact">
        <span style={{ 
          marginRight: '8px',
          fontSize: '18px'
        }}>🍽️</span>
        <strong style={{ color: darkMode ? '#4CAF50' : '#2196F3' }}>Food Fact:</strong> {randomFact}
      </div>
    </div>
  );
}

export default Main;
