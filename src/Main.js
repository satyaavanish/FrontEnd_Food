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
import "./Main.css";

function Main() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Theme handling
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

  // Menu click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleChatbot = () => setShowChatbot(prev => !prev);
  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

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
      {/* Header controls with menu and theme toggle */}
      <div className="header-controls">
        <div className={`menu-container ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <button 
            ref={buttonRef}
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            ☰
          </button>
          
          {isMenuOpen && (
            <div className="menu-dropdown">
               <button 
                className="menu-item" 
                onClick={toggleTheme}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <button 
                className="menu-item" 
                onClick={() => {
                  navigate("/HowToUse");
                  setIsMenuOpen(false);
                }}
              >
                📖 How to Use
              </button>
              <button 
                className="menu-item" 
                onClick={() => {
                  navigate("/AboutAuthor");
                  setIsMenuOpen(false);
                }}
              >
                ✍️ About Author
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="header-section">
        <div className="typewriter">
          <h1 className="main-title">Snap Detect Eat</h1>
        </div>
        <GreetingMessage />
      </div>

      {/* Navigation buttons */}
      <div className="button-container">
        <button onClick={() => navigate("/detect")} className="nav-button detect-btn">
          <span className="button-icon">📸</span>
          <span className="button-text">Snap & Detect</span>
        </button>

        <button onClick={() => navigate("/weather")} className="nav-button weather-btn">
          <span className="button-icon">🌤️</span>
          <span className="button-text">Weather Picks</span>
        </button>

        <button onClick={() => navigate("/health")} className="nav-button health-btn">
          <span className="button-icon">🍏</span>
          <span className="button-text">Wellness Picks</span>
        </button>

        <button onClick={() => navigate("/news")} className="nav-button news-btn">
          <span className="button-icon">📰</span>
          <span className="button-text">Food Trends</span>
        </button>
      </div>

      {/* Food fact */}
      <div className="fact">
        <span role="img" aria-label="plate" className="fact-icon">🍽️</span>
        <strong className="fact-title">Food Fact:</strong> {randomFact}
      </div>

      {/* Chatbot */}
      <button
        onClick={toggleChatbot}
        className={`chatbot-toggle ${showChatbot ? "active" : ""}`}
        aria-label="Food Assistant"
      >
        {showChatbot ? (
          <>
            <span>✕</span> Close
          </>
        ) : (
          <>
            <span>💬</span> Food Assistant
          </>
        )}
      </button>
      
      {showChatbot && (
        <div className="chatbot-container">
          <Chatbot />
        </div>
      )}
    </div>
  );
}

export default Main;
