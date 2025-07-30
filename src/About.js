import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="about-container">
      <button className="back-button" onClick={goHome}> 🔙 Home</button>
    <p>How to Use ?</p>
<nav className="about-navbar">
  <ul>
    <li><a href="#snap-detect">Snap & Detect</a></li>
    <li><a href="#weather">Weather</a></li>
    <li><a href="#health">Health</a></li>
    <li><a href="#news">News</a></li>
  </ul>
</nav>

      <h1 className="about-title">About Snap Detect Eat</h1>
      <p className="about-text">
        <strong>Snap Detect Eat</strong> is your intelligent food companion that has real-time data to make your eating habits healthier and smarter.
      </p>

      <div className="about-section">
         <h2 id="snap-detect">✨ Snap & Detect</h2>

        <div className="feature-item">
     
          <img src="/detect.png" alt="Snap & Detect Flow" className="feature-banner" />
          <div className="step-section">
            <p><strong>Snap & Detect:</strong> Upload a food image and get accurate identification</p>
            <ol className="feature-steps">
              <li> Take or upload a photo of your meal</li>
              <img src="/upload.PNG" className="feature-banner" />
              <li> Scans the image to detect food items</li>
               <img src="/panipuri.png" alt="Snap & Detect Flow" className="feature-banner" />
              <li> Nutrition and ingredients are fetched</li>
               <img src="/nutrients.png" alt="Snap & Detect Flow" className="feature-banner" />
              <li>Results are shown instantly with suggestions</li>
               <img src="/info.PNG" alt="Snap & Detect Flow" className="feature-banner"  />
          <img src="/location.png" alt="Snap & Detect Flow" className="feature-banner" />
          <img src="/summary.png" alt="Snap & Detect Flow" className="feature-banner"  />
            </ol>
          </div>
        </div>
      </div>
      <div className="about-section">
 <h2 id="weather">🌦️ Weather-Based Suggestions</h2>
  <div className="feature-item">
    <div className="step-section">
      <p><strong>Smart Suggestions:</strong> Get food ideas based on current weather</p>
       <img src="/weather.PNG" alt="Weather Detection" className="feature-banner" />
      <ol className="feature-steps">
        <li>📍 Detect your location or choose a city</li>
        <img src="/weather1.PNG" alt="Weather Detection" className="feature-banner" />
        <li>🌤️ Fetch real-time weather data</li>
        <img src="/weather2.png" alt="Weather Data" className="feature-banner" />

        <li>🍲 Suggest food that suits the weather (hot soups for rain, cool juices for summer)</li>
           <img src="/detials.png" alt="Weather Detection" className="feature-banner" />

      </ol>
    </div>
  </div>
</div>

 
<div className="about-section">
  <h2 id="health">💊 Health-Based Food Advisor</h2>
  <div className="feature-item">
    <div className="step-section">
      <p><strong>Eat According to Health:</strong> Get food suggestions tailored to health conditions like fever, diabetes, etc.</p>
         <img src="/wellness.png" alt="Select Health Issue" className="feature-banner" />
      <ol className="feature-steps">
        <li>💡 Choose your health issue (e.g., Cold, High BP)</li>
        <img src="/health.png" alt="Select Health Issue" className="feature-banner" />

        <li>📋 View recommended foods and scientific reasoning</li>
        <img src="/issue.png" alt="Food List" className="feature-banner" />
      </ol>
    </div>
  </div>
</div>

 <div className="about-section">
   <h2 id="news">📰 News</h2>
  <div className="feature-item">
    <div className="step-section">
      <p><strong>Food News:</strong> Stay updated with the latest news in the world of food, nutrition, health, and trends.</p>
          <img src="/news.PNG" alt="Fetching News" className="feature-banner" />
      <ol className="feature-steps">
        <li>🌐 Automatically fetches real-time food-related news from trusted sources</li>
        <li>📰 Displays curated headlines with summaries and source links</li>
        <img src="/news1.png" alt="News Display" className="feature-banner" />

        <li>📱 Easily scroll through top news related to food safety, trends, innovations, and more</li>
      </ol>
    </div>
  </div>
</div>
 
      <div className="about-footer">
        <p>🌱 Eat smart. Live well. Snap. Detect. Eat.</p>
      </div>
    </div>
  );
};

export default About;
