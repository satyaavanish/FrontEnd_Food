import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Weather.css';
import { useNavigate } from "react-router-dom";
import CityAutoComplete from './CityAutoComplete';

function WeatherFoodSuggestions() {
 
  const [city, setCity] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationError, setLocationError] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [cuisineFoods, setCuisineFoods] = useState([]);
  
  const cuisineOptions = [
    "Indian", "Italian", "Chinese", "Mexican", "French",
    "Japanese", "Thai", "Greek", "American", "Spanish"
  ];

   
  const restaurantResultsRef = useRef(null);
  const summaryRef = useRef(null);
   
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_PLACES_KEY;
  const GEMINI_API_KEY = process.env.REACT_APP_PLACES_KEY;
  const OPENWEATHER_API_KEY =  process.env.REACT_APP_WEATHER_KEY;
 
  const scrollToSuggestions = () => {
  setTimeout(() => {
   
    const scrollPosition = document.body.scrollHeight - window.innerHeight - 500;
    
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }, 200); 
};
  const getWeatherCondition = (weatherData) => {
    const main = weatherData.main.toLowerCase();
    const description = weatherData.description.toLowerCase();

    if (main.includes('rain') || description.includes('rain') || description.includes('drizzle')) {
      return 'rain';
    } else if (main.includes('clear')) {
      return 'clear';
    } else if (main.includes('clouds')) {
      return 'clouds';
    } else if (main.includes('snow')) {
      return 'snow';
    } else if (main.includes('thunderstorm')) {
      return 'thunderstorm';
    }
    return 'default';
  };

  // Food database
  const foodDatabase = {
    rain: [
      { name: 'Masala Chai', image: 'https://www.thespicehouse.com/cdn/shop/articles/Chai_Masala_Tea_1200x1200.jpg?v=1606936195', description: 'Spiced Indian tea' },
      { name: 'Samosa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn04uUqeqGZjOb0xLqsVNhWryUfDCvwHgrHg&', description: 'Crispy fried pastry' },
      { name: 'Pakoras', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcbRbgJ4lSSLTFihV0QwJ4uZ3qL2xOb7erg&s', description: 'Vegetable fritters' },
      { name: 'Vada Pav', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWpt1A_MQKtvxSMpUgCCKVZ9eRUgNlqh36ew&s', description: 'Spicy potato burger' },
      { name: 'Bread Pakora', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf_8ZfI3Yc-pOhjIYco0G4FRbPuqiDYalDUA&s', description: 'Fried bread snacks' },
      { name: 'Corn Soup', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUOc0TT0e9KEOkyAK0d85GTbV5FVJl3TiIg&s', description: 'Sweet corn warmth' },
      { name: 'Pav Bhaji', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWFK5QiKkuEahZsvrfAVG6iXiadZ4EYwQfRw&s', description: 'Buttery mashed vegetables' },
      { name: 'Hot Chocolate', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFw2RNRxrTPsTnFZ0w01m8_yvJEAJU2WdkTQ&s', description: 'Creamy chocolate drink' },
      { name: 'Momo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSueVkCgZQMThdeV4qiTt51VVlqCNMIbqZ-Aw&s', description: 'Steamed dumplings' },
      { name: 'Tomato Soup', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuUDTtIxUz7vAoXaOfmKw9Q4odFIV50hZwQ&s', description: 'Classic comfort soup' }
    ],
    clear: [
      { name: 'Fruit Salad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUAQLgjlswaSPlalS9bOt3HmnGhxoW7Wx0tw&s', description: 'Fresh seasonal fruits' },
      { name: 'Lassi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHiJV8u_M2PEcXuit25h8HaBL40ZzbFCyX5A&s', description: 'Yogurt drink' },
      { name: 'Grilled Chicken', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs00PSYOoeEZYUBE4rpjgyHyVPoehnhBfPvw&s', description: 'Lean protein' },
      { name: 'Cucumber Salad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPO5jI0kSqlMNWxfbEad3zE3D8y4MvAPI-vQ&s', description: 'Cool and refreshing' },
      { name: 'Watermelon Juice', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpSIR6Cwc6Eg_YkYNiMdFSpYZNe6ud5NjJ6Q&s', description: 'Hydrating drink' },
      { name: 'Poha', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiHW84zY0dwjE5W7_Mb-Q16PkCfxGkf5ydxw&s', description: 'Flattened rice dish' },
      { name: 'Dahi Puri', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEw8R7s6mYxRpS_kHrFRiZZNxQ880CKPZpA&s', description: 'Tangy street food' },
      { name: 'Idli Sambar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOO_0WhQq8EwvPCFWhHyeubo15s5bAjdRzA&s', description: 'Steamed rice cakes' },
      { name: 'Falooda', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6Z01ZWSLpeVefYipMiv3En6BVc2NM0v-Zg&s', description: 'Vermicelli dessert' },
      { name: 'Kokum Sherbet', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFYHaUPIZd1w_GBv2EFIkKrwdc7WhGeoUVgQ&s', description: 'Cooling digestive drink' }
    ],
    clouds: [
      { name: 'Grilled Sandwich', image: 'https://recipes.timesofindia.com/thumb/83740315.cms?width=1200&height=900', description: 'Cheese and veggies' },
      { name: 'Soup', image: 'https://www.connoisseurusveg.com/wp-content/uploads/2024/02/vegetable-noodle-soup-sq.jpg', description: 'Warm comfort' },
      { name: 'Cutlets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGOe9lxwXbz_2PGrfNqOPK109wcx1kgCZPA&s', description: 'Crispy patties' },
      { name: 'Upma', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsx0vpupbBZ1ce4THvFAZcLUjp409dvx2_rg&s', description: 'Semolina breakfast' },
      { name: 'Dhokla', image: 'https://i.ytimg.com/vi/Oz34j5---iQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBxYpR5HZhgkUyriWPAqINGBkxxUQ', description: 'Steamed savory cake' },
      { name: 'Medu Vada', image: 'https://talodfoods.com/cdn/shop/files/Meduvada-Creative_img_f4d954d2-4984-44c2-abe4-6dc2e4a1face.webp?v=1721038522&width=416', description: 'South Indian donut' },
      { name: 'Misal Pav', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ6dTFO0HPaa4MPT8gXi4S4C2osq3gKUM33A&s', description: 'Spicy curry with bread' },
      { name: 'Aloo Paratha', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlwJ6D7-ubwIGXs-yulXDSoVXFKga__LecbQ&s', description: 'Potato stuffed bread' },
      { name: 'Chole Bhature', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUAO58g2MbPfsOadsiWgrsLvKVe1LzYXQXHg&s', description: 'Chickpea curry with bread' },
      { name: 'Rajma Chawal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_c-rfxZ-gy8mmndxihPBKi6JE3VloX18Ybw&s', description: 'Kidney beans with rice' }
    ],
    snow: [
      { name: 'Gajar Ka Halwa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMI_2mt_rYbaOmQ04gGnQy8CLP0sBcjOaK3w&s', description: 'Carrot pudding' },
      { name: 'Paratha', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8i30vZll7i2itSB3NcOwfy6EcDmrI1UyHg&s', description: 'Flaky bread' },
      { name: 'Sarson Ka Saag', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlD42DiZbQ9L0KUjaUSEZvP-Yeo4PyCklbuA&s', description: 'Mustard greens' },
      { name: 'Makki Roti', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98ZffdHoYOQ3TD2zhksjSNn2dQtQ7uHI4hA&s', description: 'Cornmeal bread' },
      { name: 'Gulab Jamun', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4iABMtIaR5ObEPtX9GUzKEfdTQR5aFm85vg&s', description: 'Milk solid dessert' },
      { name: 'Jalebi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4wvxlJGtk75JyWrTAeJyqf3bwAIDNW-iWw&s', description: 'Syrup-soaked swirls' },
      { name: 'Ghee Rice', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEO93SVDb_n7RyTHCCa35kMTnMYi2Jb6fzYw&s', description: 'Aromatic clarified butter rice' },
      { name: 'Pongal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7oQM_OoYWnoSMkuvARCmtWo1D6lWy5QbSFQ&s', description: 'Rice and lentil porridge' },
      { name: 'Undhiyu', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq9bwpq69uXKJ0og7PO8fWuvnmceCwWMarKg&s', description: 'Mixed winter vegetables' },
      { name: 'Gajar Matar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HaJ4zTK7-U0KipPKXW6QCSGWO-aTf2Smkg&s', description: 'Carrot and pea curry' }
    ],
    thunderstorm: [
      { name: 'Khichdi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnweyuTdChx68wWMWSDzIyg3rA-MtZG4Ak5Q&s', description: 'Rice and lentils' },
      { name: 'Maggi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUd3ybGQYZGuQko9ylolfmyaM72lOR1Ne63Q&s', description: 'Instant noodles' },
      { name: 'Toast', image:  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m9_FLAAT3T0A98u2b_zHPtLExBNTXtW52A&s', description: 'Simple comfort' },
      { name: 'Dalia', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkzh5tk_Xpkkf9J6nFxcs7SzxMB8HCkMxqqg&s', description: 'Broken wheat porridge' },
      { name: 'Sabudana Khichdi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMlcx-gRpmJLDDuADiWEd_ENI_KTI1O-5xLw&s', description: 'Tapioca pearls dish' },
      { name: 'Poha', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE2GAWvqyVhvGGV9t2P7U4P_4BbXXV9OlW_A&s', description: 'Flattened rice' },
      { name: 'Upma', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5HHRS9dkaA9USfGd__BZFcU0QBsi7ddCbg&s', description: 'Semolina breakfast' },
      { name: 'Cornflakes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6EkAR26kut89fY_X44BI5uOT7dCCkpBAqQ&s', description: 'Quick cereal' },
      { name: 'Bread Omelette', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlrt2nwEXKSTmBrmA69ZCe-O71W2FXeLKEQ&s', description: 'Simple protein' },
      { name: 'Milk and Biscuits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85scQFuK2brhqIm1VVhnx0SumcVoVQZcwPg&s', description: 'Childhood comfort' }
    ],
    default: [
      { name: 'Biryani', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRv7RHxmRPYgze_kPFz1v6Mcdu0LF9vVZaPQ&s', description: 'Flavorful rice' },
      { name: 'Dal Chawal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq4TpfPWyr4vCtmG_eeOempMMYuhz7B7x3YQ&s', description: 'Lentils and rice' },
      { name: 'Roti Sabzi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-e_8YdCTTplg3Kc-0lGeoM0hpsmlXZ9IkA&s', description: 'Bread with veggies' },
      { name: 'Butter Chicken', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILgjZ4E3Psrc-PN_ZLbBOh2-EM7AH2XAm9Q&s', description: 'Creamy curry' },
      { name: 'Palak Paneer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkte8ho3c7qf_nwHaJs-2C-yLiJT1LZjK1dg&s', description: 'Spinach with cheese' },
      { name: 'Dosa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fGxLF0XCTT_nJKDtPzTWtlpWHe_0Rzt4OQ&s', description: 'Crispy crepe' },
      { name: 'Vada', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLKw_wmNjGhfmOAlgss7_PurQDmlh2cQKp7g&s', description: 'Savory donut' },
      { name: 'Sambar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwpcpy081doLiNiXrnzvtKSSa6ugKlqTQQaA&s', description: 'Lentil stew' },
      { name: 'Rasam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4JpUNOkEaGhYzYg8brhbJE0R87i7Ns5VMVQ&s', description: 'Pepper soup' },
      { name: 'Payasam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFeg3wyX68c6SICXdoC2bnf05KG7rQeQOGpQ&s', description: 'Sweet pudding' }
    ]
  };

  // API functions
  const fetchCuisineFoods = async (cuisine) => {
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`);
      if (res.data.meals) {
        const meals = res.data.meals.slice(0, 10).map((meal) => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
          description: `${cuisine} Dish`
        }));
        setCuisineFoods(meals);
      } else {
        setCuisineFoods([]);
      }
    } catch (err) {
      console.error("Failed to fetch cuisine meals:", err);
      setError("Failed to load cuisine options. Please try again later.");
      setCuisineFoods([]);
    }
  };

  const getUserLocation = async (foodItem) => {
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
      await searchNearbyRestaurants(latitude, longitude, foodItem.name);
      scrollToRestaurants(); 
    } catch (err) {
      setLocationError("Unable to retrieve your location. Please enable location services.");
      console.error("Geolocation error:", err);
    }
  };

  const searchNearbyRestaurants = async (lat, lng, keyword) => {
    setRestaurantsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/places", {
        params: {
          lat: lat,
          lng: lng,
          keyword: keyword
        }
      });
      
      if (res.data.results && res.data.results.length > 0) {
        const sorted = res.data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setRestaurants(sorted);
        setError('');
      } else {
        setRestaurants([]);
        setError("No restaurants found serving this dish nearby");
      }
    } catch (err) {
      console.error("Restaurant search error:", err);
      setError("Failed to find nearby restaurants. Please try again later.");
      setRestaurants([]);
    } finally {
      setRestaurantsLoading(false);
      scrollToRestaurants(); 
    }
  };

  const handleManualLocationSearch = async (foodItem) => {
    if (!city) {
      setError("Please enter a city first");
      return;
    }

    try {
      const geoRes = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: city,
          key: GOOGLE_MAPS_API_KEY
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

      await searchNearbyRestaurants(lat, lng, foodItem.name);
    } catch (err) {
      console.error("Manual location search error:", err.response?.data || err.message);
      setError("Failed to search location. Check network or API key.");
    }
  };

  const generateSummary = async () => {
    if (!selectedFood?.name) return;

    setIsSummarizing(true);
    setSummaryText("");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `Provide 8 concise bullet points about the Indian dish "${selectedFood.name}" covering:
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

      const summary = response.data.candidates[0].content.parts[0].text;
      setSummaryText(summary);
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

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setRestaurants([]);
    setSelectedFood(null);
    setWeather(null);
    const cityNameOnly = city.split(",")[0].trim();
    
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: cityNameOnly,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
        },
      });

      const weatherData = response.data.weather[0];
      const weatherCondition = getWeatherCondition(weatherData);
      
      setWeather(weatherCondition);
      setWeatherDescription(weatherData.description);
      
      // Scroll to suggestions after weather data is loaded
      scrollToSuggestions();
      
    } catch (err) {
      console.error(err);
      setError('Could not fetch weather. Please check the city name and try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getFoodItems = () => {
    if (!weather) return [];
    return foodDatabase[weather] || foodDatabase.default;
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setRestaurants([]);
    scrollToRestaurants(); 
  };

  const scrollToRestaurants = () => {
    setTimeout(() => {
      restaurantResultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  // Component rendering functions
  const renderRestaurantSearchUI = () => {
    if (!selectedFood) return null;

    return (
      <div ref={restaurantResultsRef} className="restaurant-results">
        <div className="location-button-group">
          <button 
            onClick={() => getUserLocation(selectedFood)} 
            className="location-info"
            disabled={restaurantsLoading}
            aria-label="Search restaurants near my current location"
          >
            📍 Use My Current Location
          </button>
          <button 
            onClick={() => handleManualLocationSearch(selectedFood)}
            className="manual-search"
            disabled={restaurantsLoading || !city}
            aria-label={`Search restaurants in ${city}`}
          >
            🔍 Search in {city || 'your city'}
          </button>
        </div>

        {locationError && <p className="error">{locationError}</p>}
        {restaurantsLoading && <p>Loading restaurants...</p>}

        {restaurants.length > 0 && (
          <div className="restaurant-list">
            <h3 style={{color:"red",marginBottom:"20px"}}>🍽️ Nearby Restaurants Offering "{selectedFood.name}":</h3>
            <ul>
              {restaurants.map((place, index) => (
                <li key={index}>
                  <strong>{place.name}</strong> — {place.vicinity}.
                  <strong> Rating: {place.rating ? '⭐'.repeat(Math.round(place.rating)) : 'N/A'}</strong>
                  {place.place_id && (
                    <a
                      href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                      aria-label={`View ${place.name} on map`}
                    >
                      [View on Map]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderFoodCard = (food, index) => {
    return (
      <div key={index} className="food-card">
        <div className="food-image-container">
          <img
            src={food.image}
            alt={food.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x200?text=Food+Image";
            }}
          />
        </div>
        <h4>{food.name}</h4>
        <p>{food.description}</p>
        <button
          onClick={() => handleFoodSelect(food)}
          disabled={restaurantsLoading}
          aria-label={`Find restaurants serving ${food.name}`}
        >
          {restaurantsLoading && selectedFood?.name === food.name
            ? "Searching..."
            : "Get Nearby Restaurants"}
        </button>
      </div>
    );
  };

  const renderFoodSuggestions = () => {
    const foodsToShow = getFoodItems();
    const showCuisineFoods = selectedCuisine && cuisineFoods.length > 0;

    return (
      <>
        {weather ? (
          <div className="weather-info">
            <h2>
              Weather in {city}:{" "}
              <span className="weather-condition">{weatherDescription}</span>
            </h2>
            <h3>Recommended Foods:</h3>

            <div className="food-grid">
              {foodsToShow.map((food, index) => renderFoodCard(food, index))}
            </div>

            {showCuisineFoods && (
              <>
                <h2 style={{top:"20px"}}>{selectedCuisine} Dishes Recommended in {city} Weather</h2>
                <div className="food-grid">
                  {cuisineFoods.map((food, index) => renderFoodCard(food, index))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="default-foods">
            <h2>🍽️ Popular Indian Dishes</h2>
            <p className="city-prompt" style={{color:"white"}}>
              Enter your city to get personalized weather-based suggestions.
            </p>

            <div className="food-grid">
              {foodDatabase.default.map((food, index) => renderFoodCard(food, index))}
            </div>
          </div>
        )}
      </>
    );
  };
return (
  <div className="weather-food-app">
    <button onClick={() => navigate("/")} className="back-button">
      🔙 Home
    </button>

    <h1>Weather-Based Food Suggestions</h1>

    <div className="search-container">
      <CityAutoComplete onSelect={(selectedCity) => {
        const fullCity = `${selectedCity.name}, ${selectedCity.region}, ${selectedCity.country}`;
        setCity(fullCity);
      }} />
      
      <button onClick={getWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Suggestions"}
      </button>

      <select
        className="cuisine-dropdown"
        value={selectedCuisine}
        onChange={(e) => {
          setSelectedCuisine(e.target.value);
          fetchCuisineFoods(e.target.value);
        }}
      >
        <option value="">Select Cuisine Type</option>
        {cuisineOptions.map((cuisine, index) => (
          <option key={index} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>

    {error && <p className="error-message">{error}</p>}

    {renderFoodSuggestions()}

    {selectedFood && (
      <div className="summary-section">
        <button
          onClick={generateSummary} 
          style={{height:"40px"}}
          disabled={isSummarizing}
          className="summary-button"
          aria-label={`Get information about ${selectedFood.name}`}
        >
          {isSummarizing
            ? "Generating..."
            : `📖 Info About Dish ${selectedFood?.name || ""}`}
        </button>

        {summaryText && (
          <div className="summary-container" ref={summaryRef}>
            <h3 className="summary-title">
              📘 Key Facts About {selectedFood.name}:
            </h3>
            <ul className="summary-list">
              {summaryText
                .split("\n")
                .filter((line) => line.trim().length > 0)
                .map((line, index) => (
                  <li key={index} className="summary-point">
                    {line.replace(/^\*+\s*/, "").replace(/\*\*/g, "")}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    )}
 
    {renderRestaurantSearchUI()}
  </div>
);

export default WeatherFoodSuggestions;
