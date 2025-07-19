import React, { useState, useEffect } from "react";
import axios from "axios";
import { dishObserver } from './Observer'; 
import './App.css';
import Main from "./Main";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import CityAutoComplete from "./CityAutoComplete";

function App() {
  const navigate = useNavigate();
  const nutritionCache = new Map();
  const [image, setImage] = useState(null);
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [nutrition, setNutrition] = useState({});
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState("");
  const restaurantResultsRef = useRef(null);
  const [summaryText, setSummaryText] = useState("");
  const [foodToSummarize, setFoodToSummarize] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const GEMINI_API_KEY = process.env.REACT_APP_PLACES_KEY; 
  const [detectedFood, setDetectedFood] = useState("");
  const summaryRef = useRef(null);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToRestaurants = () => {
    setTimeout(() => {
      restaurantResultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const fetchCitySuggestions = async (input) => {
    if (input.length < 2) {
      setCitySuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.teleport.org/api/cities/?search=${input}&limit=5`
      );
      const suggestions = response.data._embedded["city:search-results"]
        .map(item => item.matching_full_name)
        .filter(name => name);
      setCitySuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setCitySuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setManualLocation(suggestion);
    setShowSuggestions(false);
  };

  const handleManualLocationChange = (e) => {
    const value = e.target.value;
    setManualLocation(value);
    fetchCitySuggestions(value);
  };

  const handleCitySelect = (city) => {
    setManualLocation(`${city.name}, ${city.region}, ${city.country}`);
    setLocation({ lat: city.lat, lng: city.lng });
    setShowSuggestions(false);
  };

  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      setLocationError("");

      if (dishName) {
        try {
          const res = await axios.get("https://backend-food-i0h7.onrender.com/api/places", {
            params: {
              lat: latitude,
              lng: longitude,
              keyword: dishName
            }
          });
          
          if (res.data.results && res.data.results.length > 0) {
            const sorted = res.data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            setRestaurants(sorted);
            scrollToRestaurants();
          } else {
            setRestaurants([]);
            setError("No restaurants found serving this dish nearby");
          }
        } catch (err) {
          console.error("Restaurant search error:", err);
          setError("Failed to find nearby restaurants");
        }
      }
    } catch (err) {
      setLocationError("Unable to retrieve your location.");
      console.error("Geolocation error:", err);
    }
  };

  const handleManualLocationSearch = async () => {
    if (!manualLocation) return alert("Please enter a location");

    try {
      const geoRes = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: manualLocation,
          key: process.env.REACT_APP_PLACES_KEY
        }
      });

      if (geoRes.data.status !== "OK" || geoRes.data.results.length === 0) {
        setError("Could not find location. Please enter a more specific address.");
        return;
      }

      const { lat, lng } = geoRes.data.results[0].geometry.location;
      setLocation({ lat, lng });
      setLocationError("");
      setError("");

      const backendRes = await axios.get("https://backend-food-i0h7.onrender.com/api/places", {
        params: {
          lat,
          lng,
          keyword: dishName || ""
        }
      });

      if (backendRes.data.results?.length > 0) {
        const sorted = backendRes.data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setRestaurants(sorted);
      } else {
        setRestaurants([]);
        setError("No nearby restaurants found.");
      }
    } catch (err) {
      console.error("Manual location search error:", err.response?.data || err.message);
      setError("Failed to search location. Check network or API key.");
    } finally {
      scrollToRestaurants(); 
    }
  };

  const generateSummary = async () => {
    if (!dishName) return;
    
    setIsSummarizing(true);
    setSummaryText("");
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Provide 8 concise bullet points about the Indian dish "${dishName}" covering:
• Origin Region
• Main Ingredients (3-5)
• Flavor Profile
• Cooking Method
• Typical Serving Occasion
• Nutritional Benefit
• Common Variations
• Cultural Significance`
            }]
          }]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000
        }
      );

      if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Empty response from API");
      }

      const rawSummary = response.data.candidates[0].content.parts[0].text;
const cleanedSummary = rawSummary.replace(/\\/g, '');
setSummaryText(cleanedSummary);
 
    } catch (err) {
      console.error("API Error:", err);
      let errorMessage = "Failed to generate summary";
      if (err.response?.data?.error?.message) {
        errorMessage += `: ${err.response.data.error.message}`;
      }
      setSummaryText(`${errorMessage}. Please try again later.`);
    } finally {
  setIsSummarizing(false);
  setTimeout(() => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

  };

  const handleDetect = (dishName) => {
    setDetectedFood(dishName);
    setSummaryText("");
    setFoodToSummarize("");
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image");

    setLoading(true);
    setError("");
    setDishName("");
    setIngredients([]);
    setNutrition({});
    setRestaurants([]);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      const payload = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: image.type,
                  data: base64Image,
                },
              },
              {
                text: `
What is the name of the Indian dish in this image? Also, list the key ingredients used.
Respond in the following JSON format ONLY:
{
  "dish": "Dish Name",
  "ingredients": ["item1", "item2", "item3"]
}`.trim(),
              },
            ],
          },
        ],
      };

      try {
        const geminiRes = await axios.post(
          https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY},
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const rawText = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        let parsed = {};
        try {
          const cleanText = rawText.replace(/json|/g, "").trim();
          const match = cleanText.match(/{[\s\S]*}/);
          if (match) {
            parsed = JSON.parse(match[0]);
          } else {
            throw new Error("No JSON block found");
          }
        } catch (err) {
          console.error("Parsing error:", err.message);
          setError("Image is not in expected format.");
          setLoading(false);
          return;
        }

        const dish = parsed.dish || "Unknown Dish";
        const items = Array.isArray(parsed.ingredients) ? parsed.ingredients : [];

        setDishName(dish);
        dishObserver.notify(dish);
        setIngredients(items);

        const mainItem = dish.toLowerCase().replace(/[^\w\s]/g, "");

        const nutritionRes = await axios.post("https://backend-food-i0h7.onrender.com/detect", {
          items: [mainItem],
          displayNames: [dish],
        });

        setNutrition(nutritionRes.data);
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong. Check console or API key.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(image);
  };
 return (
  <div className="container">
    <div className="white-box">
      <button onClick={() => navigate("/")} className="back-button">🔙 Home</button>

      <h2>🥗 Food Image & Nutrition Detector</h2>

      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Detecting...
            </>
          ) : (
            "Detect Food"
          )}
        </button>
      </div>

      {image && <img src={URL.createObjectURL(image)} alt="Preview" className="image-preview" />}

      {error && <p className="error">{error}</p>}

      {dishName && (
        <>
          <h2>📝 Detected Dish Name:</h2>
          <p className="detected-dish"><strong>{dishName}</strong></p>
        </>
      )}

      {ingredients.length > 0 && (
        <div className="ingredients-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index} className={index < 3 ? "highlight" : ""}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(nutrition).length > 0 && (
        <div className="nutrition-section">
          <h3>🍎 Nutrition Information (per 100g):</h3>
          {Object.entries(nutrition).map(([item, data]) => (
            <div key={item}>
              <strong style={{color:"black"}}>{item}<br /><br /></strong>
              {typeof data === "object" ? (
                <ul>
                  <li><strong>Calories:</strong> {data.calories ?? "N/A"}</li>
                  <li><strong>Protein:</strong> {data.protein ?? "N/A"}</li>
                  <li><strong>Fat:</strong> {data.fat ?? "N/A"}</li>
                  <li><strong>Carbohydrates:</strong> {data.carbs ?? "N/A"}</li>
                  <li><strong>Fiber:</strong> {data.fiber ?? "N/A"}</li>
                  <li><strong>Sugar:</strong> {data.sugar ?? "N/A"}</li>
                  <li><strong>Sodium:</strong> {data.sodium ?? "N/A"}</li>
                </ul>
              ) : (
                <p style={{ color: "gray" }}>{data}</p>
              )}
            </div>
          ))}
        </div>
      )}

      
        <div className="manual-location-group" ref={suggestionsRef}>
        <div className="city-input-container">
          <input
            type="text"
            value={manualLocation}
            onChange={handleManualLocationChange}
            placeholder="Enter city name"
            className="city-input"
          />
          {showSuggestions && citySuggestions.length > 0 && (
            <ul className="suggestions-list">
              {citySuggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <CityAutoComplete 
          onSelect={handleCitySelect}
        />
        
        <button 
          onClick={handleManualLocationSearch} 
          className="manual-button"
          disabled={!manualLocation}
        >
          🔍 Search Restaurants
        </button>
      </div>
    </div>

    {/* Outside the white-box */}
    <div className="outside-buttons">
      <button onClick={getUserLocation} className="location-info" style={{height:"50px"}}>
        📍 Get My Location & Nearby Restaurants
      </button>

      <button 
        onClick={generateSummary} 
        disabled={isSummarizing}
        className="summary-button"  style={{height:"50px",top:"-10px"}}
      >
       {isSummarizing
  ? "Generating..."
  : `📖 Info About Dish ${dishName || ""}`}

      </button>
    </div>

    {manualLocation && <p>Location: <strong>{manualLocation}</strong></p>}
    {locationError && <p className="error">{locationError}</p>}

    {restaurants.length > 0 && (
      <div className="restaurant-list" ref={restaurantResultsRef}>
        <h3 style={{ color: "red",marginBottom:"20px" }}>🍽 Nearby Restaurants Offering "{dishName}":</h3>
        <ul>
          {restaurants.map((place, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <strong>{place.name}</strong> — {place.vicinity}. 
              <strong> Rating⭐ - {place.rating}</strong>
              <a
                href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                target="_blank"
                rel="noreferrer"
                className="map-link"
                style={{ marginLeft: "10px" }}
              >
                [Map]
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
     
    {summaryText && (
      <div className="summary-container" ref={summaryRef}>
        <h3 className="summary-title">📘 Key Facts About {dishName}:</h3>
        <ul className="summary-list">
          {summaryText
  .split('\n')
  .filter(line => line.trim().startsWith("*"))
  .map((line, index) => {
    const cleaned = line.replace(/^\+\s/, '');
    const [heading, ...rest] = cleaned.split(":");
    const content = rest.join(":").trim();
    return (
      <li key={index} className="summary-point">
        <strong>{heading}:</strong> {content}
      </li>
    );
  })}

        </ul>
      </div>
    )}
  </div>
);
}
export default App;
