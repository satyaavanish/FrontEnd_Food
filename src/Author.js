import React from 'react';

const Author = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#2c3e50', textAlign: 'center' }}>About Me</h1>
      
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        alignItems: 'center', 
        gap: '2rem', 
        marginBottom: '2rem',
        justifyContent: 'center'
      }}>
        <div style={{
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img 
            src='./download.jpg' 
            alt="Pulavarthi Satya Avanish"
            style={{ 
              width: '200px', 
              height: '200px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '4px solid #3498db',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }} 
          />
        </div>
        <div>
          <p style={{ fontSize: '1.1rem', marginTop: '0' }}>
            Myself <strong style={{ color: '#3498db', fontSize: '1.2rem' }}>Pulavarthi Satya Avanish</strong>, a passionate full-stack developer focused on building smart, AI-powered health and food solutions. My goal is to make everyday nutrition decisions easier, personalized, and backed by real data.
          </p>
        </div>
      </div>

      <h2 style={sectionHeading}>🌱 The Snap Detect Eat Vision</h2>
      <p>
        <strong style={{ color: '#27ae60' }}>Snap Detect Eat</strong> is a personal food assistant that helps users make better eating decisions by recognizing food through images or queries, offering tailored suggestions based on health, weather , and even showing nearby restaurants serving it. It also explains why each dish is good for you.
      </p>

      <h2 style={sectionHeading}>⚙️ Powered by Cutting-Edge Technology</h2>
      <div style={techGrid}>
        {[
          ["AI-Powered Analysis", "Uses Gemini Vision & ChatGPT API to detect food from images and natural queries.", "#3498db"],
          ["Nutrition Intelligence", "Fetches nutritional info from USDA FoodData Central API.", "#27ae60"],
          ["Context-Aware Suggestions", "Uses logic mapping for weather, health, and to suggest food.", "#e67e22"],
          ["News Integration", "Integrates GNews API for trending food & health updates.", "#9b59b6"],
          ["Find Nearby Restaurants", "Uses Google Maps API to show local food spots with ratings.", "#16a085"],
          ["Dish Summary Feature", "Summarizes dish health benefits using Gemini Chat API.", "#c0392b"]
        ].map(([title, desc, color]) => (
          <div key={title} style={boxStyle(color)}>
            <strong>{title}</strong>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      <h2 style={sectionHeading}>🧠 Behind the Scenes Logic</h2>
      <div style={boxStyle("#2c3e50")}>
        <ul>
          <li><strong>HashMaps:</strong> Used for caching API responses (e.g., USDA nutrition lookups) to avoid duplicate calls and reduce latency.</li>
          <li><strong>Data Mapping Structures:</strong> Health-food relationships are stored in structured JS objects to support fast lookups based on issues like Cold, Fever, or Diabetes.</li>
          <li><strong>Asynchronous Queues:</strong> Image tasks and multi-API calls are handled using async queues to improve performance and responsiveness.</li>
          <li><strong>Custom Logic Trees:</strong>Weather + health inputs are run through custom-built logic trees to suggest the most relevant food.</li>
        </ul>
      </div>

      <h2 style={sectionHeading}>✨ Why This Matters</h2>
      <p>
        With endless food choices and health conditions, it’s easy to get overwhelmed. <strong>Snap Detect Eat</strong> bridges that gap by giving users clarity, options, and explanations tailored to them—whether it’s what to eat in a fever, what dish suits rainy weather, or which restaurant nearby serves it.
      </p>

      <div style={quoteBox}>
        <p style={{ margin: 0, fontStyle: 'italic', color: '#555' }}>
          "Technology should serve humanity — not the other way around. With Snap Detect Eat, I'm combining my passion for code and care to empower food decisions that improve lives."
        </p>
        <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#2c3e50' }}>
          — Pulavarthi Satya Avanish
        </p>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#7f8c8d'
      }}>
        Crafted with care • © {new Date().getFullYear()}
      </div>
    </div>
  );
};
 
const sectionHeading = {
  marginTop: '2rem',
  color: '#2c3e50',
  borderBottom: '2px solid #eee',
  paddingBottom: '0.5rem'
};

const techGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1rem',
  marginTop: '1rem',
   color:"black"
};

const boxStyle = (color) => ({
  backgroundColor: '#f8f9fa',
  padding: '1rem',
  borderRadius: '8px',
  borderLeft: `4px solid ${color}`,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
   color:"black"
});

const quoteBox = {
  marginTop: '3rem',
  padding: '1.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  textAlign: 'center',
  borderLeft: '4px solid #3498db',
   color:"black"
};

export default Author;
