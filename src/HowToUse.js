import React from 'react';

function HowToUse() {
  return (
    <div className="info-page">
      <h1>How to Use</h1>
      <div className="info-content">
        <p>
          This application helps you identify food items and get relevant information:
        </p>
        <ul>
          <li>Use the <strong>Detect Food</strong> button to identify food from images</li>
          <li>Get weather-appropriate meal suggestions with <strong>Weather Suggestions</strong></li>
          <li>Check nutritional information with <strong>Health Suggestions</strong></li>
          <li>Stay updated with the latest food trends via <strong>Food News</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default HowToUse;
