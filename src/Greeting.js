import React, { useEffect, useState } from 'react';
import './GreetingMessage.css';  

function GreetingMessage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const messages = {
      morning: [
        "Good morning! Start your day with some fluffy Idli or a bowl of Poha!",
        "Rise and shine! How about Aloo Paratha or a hot cup of chai?",
        "Morning vibes! Fuel up with Dosa or Upma.",
      ],
      afternoon: [
        "Good afternoon! Time for a wholesome Thali or a cool bowl of curd rice?",
        "Feeling the midday slump? Try a light salad or paneer wrap!",
        "Afternoon delight! How about some lemon rice or a grilled sandwich?",
      ],
      evening: [
        "Good evening! Craving something crispy like samosas or pakoras?",
        "Evening hunger? Warm up with some soup or masala chai & biscuits!",
        "Time to relax! How about a plate of momos or pav bhaji?",
      ],
      night: [
        "Good night! A bowl of comforting Khichdi or warm milk would be perfect.",
        "Unwinding for the day? Try some dal-chawal or a light salad.",
        "Late hours call for comfort food – maybe curd rice or a warm soup?",
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
