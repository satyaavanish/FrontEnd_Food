import React, { useEffect, useState } from 'react';
import './GreetingMessage.css';  

function GreetingMessage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const messages = {
      morning: [
        "Good morning! ☀️ Have a great day!",
        "Rise and shine! 🌞",
        "Morning! Time for breakfast!",
      ],
      afternoon: [
        "Good afternoon! 🕛 Enjoy your meal!",
        "Afternoon hunger? Grab a bite!",
        "Lunch time! 🍽️",
      ],
      evening: [
        "Good evening! 🌆 Snack time?",
        "Evening cravings? Try something tasty!",
        "Relax and enjoy your dinner!",
      ],
      night: [
        "Good night! 🌙 Sleep well!",
        "Late-night munchies? Keep it light!",
        "Time to unwind! 😴",
      ],
    };

    const now = new Date();
    const hours = now.getHours();

    let timeOfDay = '';
    if (hours >= 5 && hours < 12) timeOfDay = 'morning';
    else if (hours >= 12 && hours < 17) timeOfDay = 'afternoon';
    else if (hours >= 17 && hours < 21) timeOfDay = 'evening';
    else timeOfDay = 'night';

    const randomIndex = Math.floor(Math.random() * messages[timeOfDay].length);
    const message = messages[timeOfDay][randomIndex];
 
    setGreeting(message);
  }, []);

  return (
    <div className="greeting-message">
      {greeting}
    </div>
  );
}

export default GreetingMessage;
