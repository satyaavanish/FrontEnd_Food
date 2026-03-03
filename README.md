# 🍽️ AI-Powered Food Detection & Nutrition Analysis Website

## 📌 Project Overview

This project is an **AI-powered Food Detection Web Application** that allows users to upload an image of a dish and receive:

* 🍛 Detected Food Name
* 🧾 Key Ingredients
* 🥗 Nutritional Information
* 🍽️ Nearby Restaurants (offering the same dish)

The system integrates AI-based image recognition using **Gemini API**, a backend nutrition database, and location-based services for enhanced user experience.

---

## 🚀 Features

### 🔍 1. Food Image Detection

* Users upload a food image.
* Image is processed using **Gemini API**.
* Returns:

  * Dish Name
  * Key Ingredients
  * Confidence Score (if applicable)

### 🥗 2. Nutrition Analysis

* Backend fetches nutritional values based on detected dish.
* Displays:

  * Calories
  * Protein
  * Carbohydrates
  * Fats
  * Vitamins (if available)

### 🍽️ 3. Nearby Restaurants

* Displays restaurants offering the detected dish.
* Integrated with maps/location services.

### 📱 4. Responsive UI

* Fully responsive design.
* Works on desktop, tablet, and mobile devices.
* Clean and intuitive interface.

---

## 🏗️ Tech Stack

### 💻 Frontend

* React.js
* Tailwind CSS / CSS3
* Axios (for API calls)

### 🖥️ Backend

* Node.js
* Express.js
* REST APIs

### 🧠 AI Integration

* Gemini API (for food detection & ingredient extraction)

### 🗄️ Database

* MongoDB / MySQL (for storing nutrition data & logs)

### 🌍 Other Integrations

* Maps API (for nearby restaurants & grocery stores)

---

## ⚙️ System Architecture

1. User uploads food image.
2. Frontend sends image to backend.
3. Backend calls Gemini API.
4. Gemini returns:

   * Food Name
   * Ingredients
5. Backend queries database for nutrition data.
6. Backend returns:

   * Food details
   * Nutrition info
   * Nearby stores & restaurants
7. Frontend displays structured results.

---

## 📂 Project Structure

```
food-detection-app/
│
├── client/                 # Frontend (React)
│   ├── src/
│   ├── components/
│   └── pages/
│
├── server/                 # Backend (Node + Express)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── .env
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the server directory and add:

```
GEMINI_API_KEY=your_gemini_api_key
DB_URI=your_database_connection_string
MAPS_API_KEY=your_maps_api_key
PORT=5000
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/food-detection-app.git
cd food-detection-app
```

### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4️⃣ Run Backend

```bash
cd server
npm start
```

### 5️⃣ Run Frontend

```bash
cd client
npm start
```

Application will run at:

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

---

## 🧪 How It Works

1. Upload an image of a dish.
2. AI detects the dish name and ingredients.
3. Nutrition data is fetched from backend.
4. Nearby restaurants & stores are displayed.
5. User can explore detailed nutritional insights.

---

## 📊 Future Enhancements

* ✅ User authentication & saved history
* ✅ Personalized diet recommendations
* ✅ Grocery price comparison
* ✅ Meal planning feature

---


## 🧠 Learning Outcomes

Through this project, the following concepts were implemented:

* AI API Integration (Gemini)
* Full-stack development
* REST API design
* Image processing workflow
* Database design
* Location-based services integration
* Responsive UI design

---

## 👨‍💻 Author

**Avanish**
Computer Science Engineering Student
Passionate about AI, Full-Stack Development & Problem Solving

---

## 📜 License

This project is for educational and research purposes.

---

⭐ If you found this project interesting, consider giving it a star on GitHub!
