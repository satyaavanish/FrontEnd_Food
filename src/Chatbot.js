import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chatbot() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
 
  useEffect(() => {
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
      setChat(JSON.parse(savedChat));
    }
  }, []);
 
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chat));
  }, [chat]);

   
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

   const sendQuery = async () => {
  if (!input.trim()) return;

  const userMessage = input;
  setChat(prev => [...prev, { sender: 'user', text: userMessage }]);
  setInput('');
  setLoading(true);

  try {
    const lowerInput = userMessage.toLowerCase();
    let prompt = '';

    if (
      lowerInput.includes('how to make') ||
      lowerInput.includes('recipe for') ||
      lowerInput.startsWith('how do i make') ||
      lowerInput.includes('prepare') ||
      lowerInput.includes('steps to make')
    ) {
       
      prompt = `Give a simple, step-by-step recipe for: ${userMessage.replace(/(how to make|recipe for|steps to make|prepare|how do i make)/gi, '').trim()}`;
    } else if (
      lowerInput.includes('what should') ||
      lowerInput.includes('suggest') ||
      lowerInput.includes('recommend') ||
      lowerInput.includes('food for') ||
      lowerInput.includes('dish for')
    ) {
      
      prompt = `List only dish names (no descriptions) for this prompt: "${userMessage}"`;
    } else {
       
      prompt = `You are a helpful food assistant. Respond to this user message: "${userMessage}"`;
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_PLACES_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const rawReply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';

    const cleanedReply = rawReply
      .replace(/[#*:•\-]/g, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .join('\n');

    setChat(prev => [...prev, { sender: 'bot', text: cleanedReply }]);
  } catch (error) {
    console.error(error);
    setChat(prev => [...prev, { sender: 'bot', text: 'Sorry, there was an error.' }]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center', color: 'green' }}>🍲 Food Suggestion Chatbot</h2>

      <div
        style={{
          minHeight: 200,
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
          overflowY: 'auto',
          maxHeight: 350,
          background: '#fff',
        }}
      >
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '8px 0',
              whiteSpace: 'pre-line',color: '#333'
            }}
          >
             <strong><bold><i>{msg.sender === 'user' ? 'You' : 'Foodie Friend'}:</i></bold></strong>
            <div>
              {msg.text.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !loading) sendQuery();
          }}
          placeholder="Ask me what to eat..."
          style={{
            width: '75%',
            padding: '10px',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          onClick={sendQuery}
          disabled={loading}
          style={{
            padding: '10px 16px',
            marginLeft: '10px',
            borderRadius: 4,
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : 'green',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

  
      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <button
          onClick={() => {
            setChat([]);
            localStorage.removeItem('chatHistory');
          }}
          style={{
            padding: '6px 12px',
            fontSize: 14,
            borderRadius: 4,
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          🧹 Clear History
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
