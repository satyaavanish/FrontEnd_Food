import React, { useState } from "react";
import "./Health.css";  
import { useNavigate } from "react-router-dom"; 

function Health() {
  const [selectedIssue, setSelectedIssue] = useState("");
  const navigate = useNavigate();
  const healthFoodMap = {
    Headache: [
      { name: "Almonds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPk9ERkwGJ5ZlRmlo25lu0sCBBu_Ee9aF1CQ&s", reason: "Rich in magnesium, relieves tension" },
      { name: "Ginger Tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpL-FfXe27JhrQzL_lpeJqGlBpNfH66QP2RQ&s", reason: "Reduces inflammation" },
      { name: "Spinach", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGf8kJtLCAlxYNyM2SyS873LLDAqlbTTcYw&s", reason: "High in riboflavin (B2) to prevent migraines" },
      { name: "Salmon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIyPr1oj6pO7Z49IluxM2gZadwCjdPgkosw&s", reason: "Omega-3s reduce headache frequency" },
      { name: "Watermelon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHtzzw5zPYnU45hFO_2S85xsHwNQmM7sy5g&s", reason: "Hydration combats dehydration headaches" }
    ],
    Fever: [
      { name: "Khichdi", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwh0ChaKJetVOaGtrTY3H9s7oDKiVFbK-kFg&s", reason: "Easy to digest, provides energy" },
      { name: "Coconut Water", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatxhuwDrmhp0MNUbAXWQeLBvqzJq5yGY8aA&s", reason: "Replenishes electrolytes" },
      { name: "Banana", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQp4FOovcciwmyCpp1Z3k5nAEaIsqaDscouw&s", reason: "Gentle on stomach, rich in potassium" },
      { name: "Turmeric Milk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eJmJJQEsA6pegSgdzftQxpDphxc2QqY_6g&s", reason: "Anti-inflammatory, boosts immunity" },
      { name: "Vegetable Soup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eRDhpg9shS4jQefiHwLqkEbSzCAieiKYfw&s", reason: "Hydrating and nutrient-dense" }
    ],
    Cold: [
      { name: "Tulsi Ginger Tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MJxYBxIvzoAyqMyeTGEhBJdUmR_HAZmVWQ&s", reason: "Clears congestion" },
      { name: "Hot Rasam", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNblTpQZ2xAgydEUJgiVUtYCP62f6ZB-787A&s", reason: "Spices help clear sinuses" },
      { name: "Honey Lemon Water", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZDLCgoPWAtH_wx6xTh0Yi9R1h_3XIw-yRw&s", reason: "Soothes throat" },
      { name: "Garlic Soup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ijzMRTYb2FOTkueox_18ssTd_ldFXE921w&s", reason: "Antibacterial properties" },
      { name: "Steamed Moong Dal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDha9nh9449tAUPYyJ0KP_H1MvpnrLDT1ng&s", reason: "Light protein for recovery" }
    ],
    Diabetes: [
      { name: "Sprouts Salad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YKIZe-rEVR3iQbbQNkQExli7EI0rYlBBwQ&s", reason: "Low glycemic index" },
      { name: "Palak Roti", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3lfa-O3YDydqVb360GDuR-QEAtWYaWYc9Ng&s", reason: "High fiber, regulates blood sugar" },
      { name: "Bitter Gourd Curry", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FQlE8Whw0DqGI_yyMT5Ag7S6j8X41Ezmbg&s", reason: "Lowers glucose levels" },
      { name: "Oats Idli", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ636MqXVBHmwJbWTJ__3kKIixHSHXs8f-qgQ&s", reason: "Slow-release carbs" },
      { name: "Methi Paratha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwDzda7iO0Pjvi1YnYMr8Z7erZVUmAk20iLg&s", reason: "Fenugreek improves insulin sensitivity" }
    ],
    Indigestion: [
      { name: "Jeera Water", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo3Pv8avOgR-eSrjVcM_tJ3tOxOvj3eHJAw&s", reason: "Aids digestion" },
      { name: "Papaya", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1P1KCrZr9tZ3ZhgwHj7OQxEkVQs8o6MTeQ&s", reason: "Contains digestive enzymes" },
      { name: "Curd Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7A8lsL_jv7E5jO2EnDqmwm7cC_PdrAesDg&s", reason: "Probiotics soothe the gut" },
      { name: "Saunf Tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9f3VOMoHiTHZeYvWY0nVnpJ9YLfH-a9wAWA&s", reason: "Relieves bloating" },
      { name: "Boiled Potatoes", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqZQiesi_uOWllKYNcgBotniyGqTXH8sM9g&s", reason: "Easy to digest" }
    ],
    Fatigue: [
      { name: "Dates", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIlD-5gsxCw0jyRIwdmcWjF2Agzbb9uFKW_Q&s", reason: "Quick energy boost" },
      { name: "Quinoa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeH3SX9CkiOG5W-7WI0B4sI33Tw3Bsuu4ug&s", reason: "Complete protein" },
      { name: "Dark Chocolate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbJXqZU403_eg2zfADr1xGyNtR8ON46jHVA&s", reason: "Iron and magnesium" },
      { name: "Smoothie Bowl", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhBzv1x6_3TF8rYjwPiTQ6HZLxRmXYoqVjQ&s", reason: "Vitamins + antioxidants" },
      { name: "Peanut Butter Toast", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94EKAiHDagAj6419jEYWVTjN7K3qo5jZUMQ&s", reason: "Sustained energy" }
    ],
    HighBP: [
      { name: "Beetroot Juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdPh6da_xzAQdl6k0nZNzch5iVn9-gA6GE5w&s", reason: "Lowers blood pressure" },
      { name: "Oats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27HMNzWLVKMmU1WTh-r6NgI4j54PXDGaNtw&s", reason: "Rich in beta-glucans" },
      { name: "Flaxseeds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcKEnzMklqPvxqpclT0k6ysRn9uiaP0yZQQ&s", reason: "Omega-3s reduce inflammation" },
      { name: "Pomegranate", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2il5EayFmEcUIFvC8ZMF2_tojehsiYJHGMg&s", reason: "Nitric oxide improves circulation" },
      { name: "Celery", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVa-srVfxcPfDXz4w2-fVyf7TWZnlNwGMb9w&s", reason: "Natural diuretic" }
    ],
    Immunity: [
      { name: "Amla Juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrK14avqxwgGqJoQOdu4nseDLEp2m_ielOQ&s", reason: "Vitamin C powerhouse" },
      { name: "Mushroom Soup", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCZ8ZLybc-CrY_LHHImeAIjZi1yqQKiw0FQ&s", reason: "Beta-glucans boost immunity" },
      { name: "Citrus Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9aZEwHK-EtpZo3A5RB8B5LgEGdUHz_psWg&s", reason: "Antioxidant-rich" },
      { name: "Yogurt", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPzvpIx84r13TTKup3BjxPLILOEUOc9jlDA&s", reason: "Probiotics support gut health" },
      { name: "Almonds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9CaUrS_hIC7QU-m9U0zNk1fR8bKZL5sPnA&s", reason: "Vitamin E for immune function" }
    ],
    Acne: [
      { name: "Cucumber", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNd0_amGa5ERd4MA52jhyHaTwnwBEcBuQ0Mg&s", reason: "Hydrates and detoxifies" },
      { name: "Green Tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeAWIM4zVEnuac0wffXB6p5ZPC1KiPajqcg&s", reason: "Reduces inflammation" },
      { name: "Walnuts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcpqB-4jwLQQHxg5Pd1N2Jz3Ra6ji_IiAFQ&s", reason: "Zinc fights bacteria" },
      { name: "Carrot Juice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYR2DgauVF_z1zjCwkaXM9v4me2x3UiBO6Q&s", reason: "Vitamin A regulates oil" },
      { name: "Chia Seeds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGrxPa9wqHDk_HfezK83OM7FEEXieIg13VQ&s", reason: "Omega-3s reduce redness" }
    ],
    Insomnia: [
      { name: "Warm Milk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL50qlb2ZbtEflIYtqQKXEMKDYdO49jFkwCg&s", reason: "Tryptophan promotes sleep" },
      { name: "Banana", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7ppeIHto7LDIU8C5ti9idiz_fPCQl4aHHA&s", reason: "Magnesium relaxes muscles" },
      { name: "Almonds", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR3a86_3aDCs5vXlDIRZXcy493n1sc2PZrQ&s", reason: "Melatonin precursor" },
      { name: "Chamomile Tea", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSze8cHO960wt9lprg9pLISTgThAoVw5ULkw&s", reason: "Calms the nervous system" },
      { name: "Oats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3ojJVKSxtdiy8XSRrTSg3jk0QeSfs_3lrQ&s", reason: "Complex carbs aid serotonin production" }
    ]
  };

const foodList = healthFoodMap[selectedIssue] || [];

  return (
    <div className="health-page">
      <button onClick={() => navigate("/")} className="back-button">
        🔙 Home
      </button>
      
      <h1 className="title">🍏 Health Food Advisor</h1>
      
      <div className="dropdown-container">
        <select
          value={selectedIssue}
          onChange={(e) => setSelectedIssue(e.target.value)}
          className="dropdown"
        >
          <option value="">-- Select a Health Issue --</option>
          {Object.keys(healthFoodMap).map((issue) => (
            <option key={issue} value={issue}>{issue}</option>
          ))}
        </select>
      </div>

      {selectedIssue && (
        <div className="results-section">
          <h2 className="subtitle">
            Recommended Foods for <span className="issue-name">{selectedIssue}</span>
          </h2>
          <div className="food-grid">
            {foodList.map((food, index) => (
              <div key={index} className="food-card">
                <img src={food.image} alt={food.name} className="food-image" />
                <h3>{food.name}</h3>
                <p className="reason">{food.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Health;