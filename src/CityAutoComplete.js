 import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './CityAutoComplete.css';

const CityAutoComplete = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounce API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim().length >= 2) {
        fetchCities(input.trim());
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  const fetchCities = async (query) => {
    setLoading(true);
    setError(null);
    setActiveIndex(-1);
    
    try {
      const response = await axios.get(
        'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        {
          params: {
            namePrefix: query,
            limit: 8,
            sort: '-population',
            minPopulation: 50000
          },
          headers: {
            'X-RapidAPI-Key':"965ab9692dmsh7efc9ace995a429p1a1ae3jsn80455528157a" ,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        }
      );

      const cities = response.data.data.map(city => ({
        id: city.id,
        name: city.city,
        region: city.region,
        country: city.country,
        countryCode: city.countryCode,
        latitude: city.latitude,
        longitude: city.longitude
      }));

      setSuggestions(cities);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to fetch city suggestions. Please try again.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (city) => {
    setInput(`${city.name}, ${city.region}, ${city.country}`);
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelect) onSelect(city);
  };

  const handleKeyDown = (e) => {
    // Keyboard navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="city-autocomplete" ref={wrapperRef}>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a city worldwide..."
        className="city-input"
        aria-autocomplete="list"
        aria-expanded={showSuggestions && suggestions.length > 0}
        aria-haspopup="listbox"
      />
      
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          Loading...
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list" role="listbox">
          {suggestions.map((city, index) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
              className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <span className="city-name">{city.name}</span>
              <span className="city-details">
                {city.region && `${city.region}, `}{city.country}
              </span>
              <span className={`country-flag fi fi-${city.countryCode.toLowerCase()}`}></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutoComplete;
