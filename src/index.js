 
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Main from "./Main";
import Weather from "./Weather";
import Chatbot from './Chatbot';
import News from "./News";
import Health from "./Health";
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detect" element={<App />} />
       <Route path="/weather" element={<Weather />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/health" element={<Health />} />
 
<Route path="/news" element={<News />} />
    </Routes>
  </Router>
);
