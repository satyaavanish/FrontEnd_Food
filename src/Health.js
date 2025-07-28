import React, { useState } from "react";
import "./Health.css";  
import { useNavigate } from "react-router-dom"; 
 

function Health() {
  const [selectedIssue, setSelectedIssue] = useState("");
   const [flippedCards, setFlippedCards] = useState({});
  const navigate = useNavigate();
  const healthFoodMap = {
     Headache: [
  {
    name: "Almonds",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPk9ERkwGJ5ZlRmlo25lu0sCBBu_Ee9aF1CQ&s",
    reason: "Almonds are rich in magnesium, which helps relax blood vessels and reduce the tension that causes headaches. A small handful daily can be beneficial."
  },
  {
    name: "Ginger Tea",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpL-FfXe27JhrQzL_lpeJqGlBpNfH66QP2RQ&s",
    reason: "Ginger tea contains anti-inflammatory compounds that reduce the production of pain-inducing chemicals in the body, relieving sinus or migraine headaches."
  },
  {
    name: "Spinach",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGf8kJtLCAlxYNyM2SyS873LLDAqlbTTcYw&s",
    reason: "Loaded with riboflavin (Vitamin B2), spinach helps in reducing migraine frequency and improving energy metabolism in brain cells."
  },
  {
    name: "Salmon",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIyPr1oj6pO7Z49IluxM2gZadwCjdPgkosw&s",
    reason: "Salmon is packed with omega-3 fatty acids that reduce inflammation and lower the occurrence and severity of headaches over time."
  },
  {
    name: "Watermelon",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHtzzw5zPYnU45hFO_2S85xsHwNQmM7sy5g&s",
    reason: "Hydrating fruits like watermelon help replenish lost fluids and electrolytes, which is crucial for preventing dehydration-related headaches."
  },
  {
    name: "Bananas",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2M95CjnEYbmRoyXM83CZHUlj2ARs8fgqKg&s",
    reason: "Rich in potassium and magnesium, bananas help stabilize blood pressure and reduce muscular tension, common headache triggers."
  },
  {
    name: "Flaxseeds",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlIQ0OBkNWz9K5mZwhCKpgpNlguTvs-Gt4bw&s",
    reason: "Flaxseeds are high in omega-3s and anti-inflammatory compounds that support vascular health and reduce the intensity of headaches."
  },
  {
    name: "Turmeric",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIlgPXIB0LwX04q5a_wjeqwamURgmuQ9tYQ&s",
    reason: "Turmeric contains curcumin, a powerful natural anti-inflammatory that may help relieve chronic and tension-related headaches."
  },
  {
    name: "Cherries",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5fLPlAR5ylvdP48JgdKWmVTlJVRC9C5_J4w&s",
    reason: "Cherries are a natural source of melatonin and antioxidants, which help improve sleep quality and reduce inflammation-induced headaches."
  },
  {
    name: "Pumpkin Seeds",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_vy4z592a_Ki29ZuORQ-_PiZNL2zAjkXJqA&s",
    reason: "These seeds are loaded with magnesium and zinc—key nutrients that help relieve stress and muscle contractions associated with headaches."
  },
  {
    name: "Coconut Water",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwnK2GXQEeLjpCAq_6ZsFwbPJA6ahgBQT4A&s",
    reason: "Coconut water is rich in electrolytes like potassium and magnesium that hydrate the body and reduce headache-causing dehydration."
  },
  {
    name: "Avocados",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmYBB8nTKrNe91mzkygN6yXlrwpJB5CQ1jg&s",
    reason: "Packed with healthy fats, potassium, and magnesium, avocados help relax blood vessels and support brain function, reducing migraine risk."
  }
],

    Fever: [
  { 
    name: "Khichdi", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwh0ChaKJetVOaGtrTY3H9s7oDKiVFbK-kFg&s", 
    reason: "A light and soothing dish made from rice and lentils that’s easy on the stomach, keeps you full, and helps the body recover energy efficiently during fever." 
  },
  { 
    name: "Coconut Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatxhuwDrmhp0MNUbAXWQeLBvqzJq5yGY8aA&s", 
    reason: "Naturally rich in potassium and electrolytes, it helps restore hydration, especially important during fever-induced fluid loss." 
  },
  { 
    name: "Banana", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQp4FOovcciwmyCpp1Z3k5nAEaIsqaDscouw&s", 
    reason: "Soft and bland fruit rich in potassium, ideal for sensitive stomachs, and provides quick energy while being easy to digest." 
  },
  { 
    name: "Turmeric Milk", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eJmJJQEsA6pegSgdzftQxpDphxc2QqY_6g&s", 
    reason: "A traditional remedy with anti-inflammatory curcumin; helps reduce fever, improve immunity, and promote restful sleep." 
  },
  { 
    name: "Vegetable Soup", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eRDhpg9shS4jQefiHwLqkEbSzCAieiKYfw&s", 
    reason: "Loaded with nutrients and fluids, vegetable soups offer hydration and essential vitamins to fight infection and support recovery." 
  },
  { 
    name: "Lemon-Honey Warm Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZDLCgoPWAtH_wx6xTh0Yi9R1h_3XIw-yRw&s", 
    reason: "This warm blend offers throat relief and delivers antioxidants and vitamin C to enhance the immune system." 
  },
  { 
    name: "Mashed Potatoes", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqZQiesi_uOWllKYNcgBotniyGqTXH8sM9g&s", 
    reason: "Creamy and soft, mashed potatoes are rich in carbs and potassium, providing comfort food that supports recovery." 
  },
  { 
    name: "Herbal Tulsi Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MJxYBxIvzoAyqMyeTGEhBJdUmR_HAZmVWQ&s", 
    reason: "A calming herbal drink with natural antiviral and anti-inflammatory properties, ideal for reducing fever and easing throat discomfort." 
  },
  { 
    name: "Moong Dal Soup", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDha9nh9449tAUPYyJ0KP_H1MvpnrLDT1ng&s", 
    reason: "Packed with protein and light on digestion, moong dal soup strengthens the body while being gentle on a weakened digestive system." 
  },
  { 
    name: "Steamed Apples", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9aZEwHK-EtpZo3A5RB8B5LgEGdUHz_psWg&s", 
    reason: "Steaming apples makes them soft and gut-friendly; they provide fiber, pectin, and vitamins to soothe and nourish during illness." 
  },
  { 
    name: "Barley Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ636MqXVBHmwJbWTJ__3kKIixHSHXs8f-qgQ&s", 
    reason: "A natural coolant that also detoxifies the system, barley water hydrates and helps flush toxins out during fever." 
  },
  { 
    name: "Ripe Papaya", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1P1KCrZr9tZ3ZhgwHj7OQxEkVQs8o6MTeQ&s", 
    reason: "Enzymes like papain in papaya improve digestion and nutrient absorption, helping the body regain strength after a fever." 
  },
  { 
    name: "Oat Porridge", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27HMNzWLVKMmU1WTh-r6NgI4j54PXDGaNtw&s", 
    reason: "Rich in soluble fiber and easy to eat, oat porridge provides steady energy and is very calming on an upset stomach." 
  },
  { 
    name: "Boiled Carrots", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYR2DgauVF_z1zjCwkaXM9v4me2x3UiBO6Q&s", 
    reason: "Carrots are loaded with beta-carotene which boosts immunity and, when boiled, become extremely digestible and healing." 
  },
  { 
    name: "Pomegranate Juice", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2il5EayFmEcUIFvC8ZMF2_tojehsiYJHGMg&s", 
    reason: "Packed with antioxidants and vitamins, pomegranate juice supports hydration and helps in combating fever-related fatigue." 
  }
],
    Cold: [
  { 
    name: "Tulsi Ginger Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MJxYBxIvzoAyqMyeTGEhBJdUmR_HAZmVWQ&s", 
    reason: "Combines the healing power of tulsi (holy basil) and ginger to boost immunity, reduce inflammation, and clear nasal and chest congestion." 
  },
  { 
    name: "Hot Rasam", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNblTpQZ2xAgydEUJgiVUtYCP62f6ZB-787A&s", 
    reason: "A spicy South Indian soup rich in black pepper, tamarind, garlic, and turmeric that naturally helps decongest sinuses and soothe sore throat." 
  },
  { 
    name: "Honey Lemon Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZDLCgoPWAtH_wx6xTh0Yi9R1h_3XIw-yRw&s", 
    reason: "Warm water with lemon and honey soothes the throat, reduces irritation, and supplies vitamin C to help strengthen immunity." 
  },
  { 
    name: "Garlic Soup", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ijzMRTYb2FOTkueox_18ssTd_ldFXE921w&s", 
    reason: "Garlic is a natural antibiotic with antiviral properties that helps fight cold-causing pathogens and eases breathing." 
  },
  { 
    name: "Steamed Moong Dal", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDha9nh9449tAUPYyJ0KP_H1MvpnrLDT1ng&s", 
    reason: "Light on digestion and high in protein, it supports recovery while being soothing and gentle for the body during a cold." 
  },
  { 
    name: "Turmeric Milk (Golden Milk)", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eJmJJQEsA6pegSgdzftQxpDphxc2QqY_6g&s", 
    reason: "Curcumin in turmeric acts as a strong anti-inflammatory and antioxidant to relieve cold symptoms and promote faster healing." 
  },
  { 
    name: "Chicken Soup", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eRDhpg9shS4jQefiHwLqkEbSzCAieiKYfw&s", 
    reason: "A classic comfort food that helps thin mucus, reduce inflammation, and provide warmth and hydration to the body." 
  },
  { 
    name: "Peppermint Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeAWIM4zVEnuac0wffXB6p5ZPC1KiPajqcg&s", 
    reason: "Contains menthol, which naturally clears sinuses, relieves throat irritation, and soothes the respiratory tract." 
  },
  { 
    name: "Jaggery-Ginger Concoction", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT77TjwqEA4g3EUVStE49bgvc3fgBpXIZ6mMw&s", 
    reason: "A warm, sweet-spicy mixture that clears chest congestion, relieves cough, and offers an instant energy boost." 
  },
  { 
    name: "Cinnamon Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpL-FfXe27JhrQzL_lpeJqGlBpNfH66QP2RQ&s", 
    reason: "Cinnamon has natural antimicrobial properties, which help fight off infection and reduce common cold symptoms." 
  },
  { 
    name: "Ajwain (Carom Seeds) Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo3Pv8avOgR-eSrjVcM_tJ3tOxOvj3eHJAw&s", 
    reason: "Ajwain-infused water is excellent for relieving nasal congestion, cough, and mild digestive discomfort during colds." 
  },
  { 
    name: "Steamed Pears", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9aZEwHK-EtpZo3A5RB8B5LgEGdUHz_psWg&s", 
    reason: "Soft, warm pears are easy on the throat and digestion while helping soothe inflammation in the respiratory tract." 
  },
  { 
    name: "Mulethi (Licorice) Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSze8cHO960wt9lprg9pLISTgThAoVw5ULkw&s", 
    reason: "A traditional remedy that acts as a natural expectorant, loosening phlegm and calming sore throats effectively." 
  },
  { 
    name: "Wheat Porridge", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27HMNzWLVKMmU1WTh-r6NgI4j54PXDGaNtw&s", 
    reason: "Warm, comforting, and rich in energy-providing complex carbs that support the body in healing from cold." 
  },
  { 
    name: "Clove-Infused Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlIQ0OBkNWz9K5mZwhCKpgpNlguTvs-Gt4bw&s", 
    reason: "Clove has pain-relieving and antibacterial properties that help reduce throat pain and kill infection-causing microbes." 
  }
], Diabetes: [
  { 
    name: "Sprouts Salad", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YKIZe-rEVR3iQbbQNkQExli7EI0rYlBBwQ&s", 
    reason: "Packed with fiber and protein, sprouts slow down carbohydrate absorption and help stabilize blood sugar levels naturally." 
  },
  { 
    name: "Palak Roti", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3lfa-O3YDydqVb360GDuR-QEAtWYaWYc9Ng&s", 
    reason: "Spinach is rich in magnesium which supports insulin sensitivity and promotes better glucose control." 
  },
  { 
    name: "Bitter Gourd Curry", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2FQlE8Whw0DqGI_yyMT5Ag7S6j8X41Ezmbg&s", 
    reason: "Contains charantin and polypeptide-p which are known to reduce blood glucose levels effectively." 
  },
  { 
    name: "Oats Idli", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ636MqXVBHmwJbWTJ__3kKIixHSHXs8f-qgQ&s", 
    reason: "Rich in beta-glucans, oats help slow glucose absorption and improve insulin sensitivity." 
  },
  { 
    name: "Methi Paratha", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwDzda7iO0Pjvi1YnYMr8Z7erZVUmAk20iLg&s", 
    reason: "Fenugreek leaves are rich in soluble fiber and 4-hydroxyisoleucine, which improve blood sugar regulation." 
  },
  { 
    name: "Flaxseed Chutney", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlIQ0OBkNWz9K5mZwhCKpgpNlguTvs-Gt4bw&s", 
    reason: "Loaded with omega-3 fatty acids and lignans, flaxseeds reduce insulin resistance and improve metabolic health." 
  },
  { 
    name: "Cinnamon Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpL-FfXe27JhrQzL_lpeJqGlBpNfH66QP2RQ&s", 
    reason: "Cinnamon contains MHCP, a compound that mimics insulin and helps improve glucose uptake by cells." 
  },
  { 
    name: "Moong Dal Dhokla", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaDha9nh9449tAUPYyJ0KP_H1MvpnrLDT1ng&s", 
    reason: "Low in glycemic index and fermented, this dish offers easy digestion and supports stable blood sugar." 
  },
  { 
    name: "Amla Murabba", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrK14avqxwgGqJoQOdu4nseDLEp2m_ielOQ&s", 
    reason: "Amla is rich in chromium, which enhances the body's ability to regulate carbohydrate metabolism and control sugar levels." 
  },
  { 
    name: "Quinoa Upma", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeH3SX9CkiOG5W-7WI0B4sI33Tw3Bsuu4ug&s", 
    reason: "A high-protein, low-glycemic grain that helps keep blood sugar stable and provides sustained energy." 
  },
  { 
    name: "Walnut Ladoo (Sugar-free)", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcpqB-4jwLQQHxg5Pd1N2Jz3Ra6ji_IiAFQ&s", 
    reason: "Rich in healthy fats, fiber, and antioxidants, walnuts help improve insulin sensitivity and glycemic control." 
  },
  { 
    name: "Ragi Dosa", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ZvQV10Ge0LbqRGRZKzRpbnTsO41rcdfZWw&s", 
    reason: "Ragi is high in fiber and calcium, promoting slow sugar release into the bloodstream and long-lasting satiety." 
  },
  { 
    name: "Cucumber-Mint Raita", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNd0_amGa5ERd4MA52jhyHaTwnwBEcBuQ0Mg&s", 
    reason: "Cucumber hydrates, while mint and yogurt provide probiotics that support digestion and metabolic regulation." 
  },
  { 
    name: "Drumstick Leaves Curry", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGf8kJtLCAlxYNyM2SyS873LLDAqlbTTcYw&s", 
    reason: "Moringa (drumstick leaves) contains chlorogenic acid, which helps lower post-meal blood sugar spikes." 
  },
  { 
    name: "Chia Seed Pudding", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGrxPa9wqHDk_HfezK83OM7FEEXieIg13VQ&s", 
    reason: "High in soluble fiber, chia seeds form a gel-like consistency in the stomach, slowing digestion and sugar release." 
  }
],
       Indigestion: [
    { 
      name: "Jeera Water", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo3Pv8avOgR-eSrjVcM_tJ3tOxOvj3eHJAw&s", 
      reason: "Thymol in cumin seeds stimulates the secretion of digestive enzymes and helps in proper digestion." 
    },
    { 
      name: "Papaya", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1P1KCrZr9tZ3ZhgwHj7OQxEkVQs8o6MTeQ&s", 
      reason: "Contains papain, a natural enzyme that helps break down tough proteins and supports smoother digestion." 
    },
    { 
      name: "Curd Rice", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7A8lsL_jv7E5jO2EnDqmwm7cC_PdrAesDg&s", 
      reason: "Fermented curd is rich in probiotics like lactobacillus, which soothes the gut lining and aids digestion." 
    },
    { 
      name: "Saunf Tea", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9f3VOMoHiTHZeYvWY0nVnpJ9YLfH-a9wAWA&s", 
      reason: "Contains anethole, which relaxes the muscles in the gastrointestinal tract to relieve bloating and gas." 
    },
    { 
      name: "Boiled Potatoes", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqZQiesi_uOWllKYNcgBotniyGqTXH8sM9g&s", 
      reason: "Mild and starchy food that is easy to digest and supports healthy gut bacteria through resistant starch." 
    },
    { 
      name: "Ginger-Ajwain Shot", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpL-FfXe27JhrQzL_lpeJqGlBpNfH66QP2RQ&s", 
      reason: "Powerful remedy combining ginger's zingerone and ajwain's thymol to reduce bloating and stimulate digestion." 
    },
    { 
      name: "Pineapple Chunks", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBW8DpLHMx7tz317f-gfImNDDB9m46t700A&s", 
      reason: "Bromelain enzyme in pineapple assists in protein breakdown and soothes inflammation in the stomach." 
    },
    { 
      name: "Mint-Coriander Chutney", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MJxYBxIvzoAyqMyeTGEhBJdUmR_HAZmVWQ&s", 
      reason: "Menthol and essential oils from mint and coriander relax the digestive muscles and ease discomfort." 
    },
    { 
      name: "Moong Dal Khichdi", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwh0ChaKJetVOaGtrTY3H9s7oDKiVFbK-kFg&s", 
      reason: "A light, easily digestible meal with protein-rich dal and soothing cumin and ghee." 
    },
    { 
      name: "Buttermilk with Roasted Cumin", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPzvpIx84r13TTKup3BjxPLILOEUOc9jlDA&s", 
      reason: "Probiotics in buttermilk and carminative cumin help reduce acidity and support digestion." 
    },
    { 
      name: "Steamed Apples", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTiXPSm_EJyBzVm5PnZ0TdbEX5N8GSWgj6UQ&s", 
      reason: "Pectin in apples forms a soothing layer over the stomach lining, aiding in digestive comfort." 
    },
    { 
      name: "Hing (Asafoetida) Water", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTo3Pv8avOgR-eSrjVcM_tJ3tOxOvj3eHJAw&s", 
      reason: "Has anti-flatulent and antispasmodic properties that help alleviate gas and indigestion." 
    },
    { 
      name: "Banana Stem Juice", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKHLjcEVuc9pbaHdTd4cWvdS9rXBfGw3yWvw&s", 
      reason: "Rich in fiber that helps cleanse the digestive tract and relieve bloating and acidity." 
    },
    { 
      name: "Sabudana Khichdi", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mISjbF7vtDV0779I5CJqJvu3FFjR44_reQ&s", 
      reason: "A soft and gentle food that provides energy and soothes an irritated digestive system." 
    },
    { 
      name: "Chamomile Tea", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSze8cHO960wt9lprg9pLISTgThAoVw5ULkw&s", 
      reason: "Contains bisabolol and flavonoids that reduce intestinal inflammation and ease stomach cramps." 
    }
  ],

  Fatigue: [
    { 
      name: "Dates", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIlD-5gsxCw0jyRIwdmcWjF2Agzbb9uFKW_Q&s", 
      reason: "Packed with natural sugars and potassium to give a quick boost of energy and replenish minerals." 
    },
    { 
      name: "Quinoa", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeH3SX9CkiOG5W-7WI0B4sI33Tw3Bsuu4ug&s", 
      reason: "A complete protein with all 9 essential amino acids to sustain energy throughout the day." 
    },
    { 
      name: "Dark Chocolate (70%+)", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbJXqZU403_eg2zfADr1xGyNtR8ON46jHVA&s", 
      reason: "High magnesium content supports energy production and fights stress-induced fatigue." 
    },
    { 
      name: "Smoothie Bowl", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhBzv1x6_3TF8rYjwPiTQ6HZLxRmXYoqVjQ&s", 
      reason: "Combines fruits and leafy greens rich in antioxidants and iron to combat tiredness and promote vitality." 
    },
    { 
      name: "Peanut Butter Toast", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94EKAiHDagAj6419jEYWVTjN7K3qo5jZUMQ&s", 
      reason: "Provides a combo of complex carbs and healthy fats for long-lasting energy release." 
    },
    { 
      name: "Chia Seed Pudding", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGrxPa9wqHDk_HfezK83OM7FEEXieIg13VQ&s", 
      reason: "Rich in omega-3s and fiber to reduce inflammation and support endurance." 
    },
    { 
      name: "Beetroot Shots", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdPh6da_xzAQdl6k0nZNzch5iVn9-gA6GE5w&s", 
      reason: "Nitrates improve blood flow and oxygen delivery, enhancing physical performance." 
    },
    { 
      name: "Pumpkin Seeds", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTvW4API3MoVtxTSIFwdFenrRGJpYTP1uYg&s", 
      reason: "Loaded with magnesium and zinc which are crucial for energy production and mental clarity." 
    },
    { 
      name: "Matcha Latte", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeAWIM4zVEnuac0wffXB6p5ZPC1KiPajqcg&s", 
      reason: "Contains L-theanine and caffeine that improve focus and provide stable energy." 
    },
    { 
      name: "Lentil Soup", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eRDhpg9shS4jQefiHwLqkEbSzCAieiKYfw&s", 
      reason: "Iron and protein-packed meal that combats anemia and supports sustained energy." 
    },
    { 
      name: "Avocado Toast", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBtYI3r_4gUqKbSMVHcR32RIecynU-J2o_w&s", 
      reason: "Monounsaturated fats nourish cells and support mitochondrial energy metabolism." 
    },
    { 
      name: "Greek Yogurt Parfait", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPzvpIx84r13TTKup3BjxPLILOEUOc9jlDA&s", 
      reason: "Combines protein and probiotics with vitamin B12 to fight tiredness and brain fog." 
    },
    { 
      name: "Edamame", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4YKIZe-rEVR3iQbbQNkQExli7EI0rYlBBwQ&s", 
      reason: "High in folate which is essential for red blood cell production and energy." 
    },
    { 
      name: "Turmeric Golden Milk", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eJmJJQEsA6pegSgdzftQxpDphxc2QqY_6g&s", 
      reason: "Curcumin fights oxidative stress and inflammation that contribute to fatigue." 
    },
    { 
      name: "Watermelon Smoothie", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHtzzw5zPYnU45hFO_2S85xsHwNQmM7sy5g&s", 
      reason: "Contains L-citrulline which increases blood flow to muscles and reduces tiredness." 
    }
  ],
     HighBP: [
    {
      name: "Beetroot Juice",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdPh6da_xzAQdl6k0nZNzch5iVn9-gA6GE5w&s",
      reason: "Beetroot is rich in dietary nitrates that convert into nitric oxide, a molecule that relaxes and dilates blood vessels. This process improves blood flow and significantly helps in reducing systolic and diastolic blood pressure."
    },
    {
      name: "Oats",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27HMNzWLVKMmU1WTh-r6NgI4j54PXDGaNtw&s",
      reason: "Oats contain a soluble fiber called beta-glucan, which reduces bad cholesterol (LDL) and improves blood vessel function. Regular consumption can lower systolic blood pressure by 2–3 mmHg."
    },
    {
      name: "Flaxseeds",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGcKEnzMklqPvxqpclT0k6ysRn9uiaP0yZQQ&s",
      reason: "Flaxseeds are high in alpha-linolenic acid and lignans, which improve arterial elasticity, reduce oxidative stress, and help lower blood pressure naturally."
    },
    {
      name: "Pomegranate",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2il5EayFmEcUIFvC8ZMF2_tojehsiYJHGMg&s",
      reason: "Packed with punicalagins and antioxidants, pomegranates enhance nitric oxide levels and reduce plaque formation, which supports overall cardiovascular health and blood pressure regulation."
    },
    {
      name: "Celery",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVa-srVfxcPfDXz4w2-fVyf7TWZnlNwGMb9w&s",
      reason: "Celery contains phthalides like 3-n-butylphthalide (3NB), which relax the smooth muscles in the arteries, improve blood flow, and support lower blood pressure."
    },
    {
      name: "Hibiscus Tea",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSze8cHO960wt9lprg9pLISTgThAoVw5ULkw&s",
      reason: "Rich in anthocyanins and polyphenols, hibiscus tea acts as a natural ACE inhibitor, effectively lowering systolic blood pressure in hypertensive individuals."
    },
    {
      name: "Garlic",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ijzMRTYb2FOTkueox_18ssTd_ldFXE921w&s",
      reason: "Garlic’s allicin increases the production of nitric oxide and hydrogen sulfide, both of which promote vasodilation and reduced vascular resistance."
    },
    {
      name: "Watermelon Seeds",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROHtzzw5zPYnU45hFO_2S85xsHwNQmM7sy5g&s",
      reason: "They contain cucurbitacin E and magnesium, which help regulate calcium flow into blood vessels, thereby aiding smooth blood circulation and lower blood pressure."
    },
    {
      name: "Dark Leafy Greens",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGf8kJtLCAlxYNyM2SyS873LLDAqlbTTcYw&s",
      reason: "Foods like spinach, kale, and swiss chard are high in potassium and nitrates, helping kidneys flush excess sodium and improve endothelial function."
    },
    {
      name: "Pistachios",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPk9ERkwGJ5ZlRmlo25lu0sCBBu_Ee9aF1CQ&s",
      reason: "Pistachios are rich in gamma-tocopherol, a vitamin E variant that helps relax blood vessels, improve vascular resistance, and reduce arterial stiffness."
    },
    {
      name: "Fatty Fish",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIyPr1oj6pO7Z49IluxM2gZadwCjdPgkosw&s",
      reason: "Omega-3 fatty acids (EPA and DHA) in fish like salmon reduce triglycerides, lower inflammation, and help prevent hypertension and heart disease."
    },
    {
      name: "Olive Oil",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHft7W-oXJqulJxxvBazSa2fX1h4pC_IM7g&s",
      reason: "Olive oil is rich in polyphenols and monounsaturated fats that enhance nitric oxide bioavailability, improving vessel flexibility and reducing blood pressure."
    },
    {
      name: "Kiwi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAjhZbiwqxOuxourQqfXOGmPRNqCCy7vUkhQ&s",
      reason: "Kiwis contain lutein and vitamin C, which help reduce oxidative damage and improve endothelial function, contributing to better blood pressure control."
    },
    {
      name: "Cinnamon",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv8vq-ju6j26LMLdVVSKR7S8Wx2j3KQp1_vA&s",
      reason: "Cinnamon contains MHCP, a compound that mimics insulin and enhances vasodilation by improving insulin sensitivity and reducing vascular tension."
    },
    {
      name: "Tomatoes",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIU7AqfbkOij-U4MSHaw950TrtwOLSrK3pQw&s",
      reason: "Tomatoes are rich in lycopene, a powerful antioxidant known to reduce arterial stiffness and improve vascular health, especially in hypertensive individuals."
    }
  ],
      Immunity: [
    {
      name: "Amla Juice",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVrK14avqxwgGqJoQOdu4nseDLEp2m_ielOQ&s",
      reason: "Extremely rich in Vitamin C (600mg/100g), which enhances neutrophil function and helps regenerate other antioxidants like Vitamin E, boosting immunity manifold."
    },
    {
      name: "Mushroom Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCZ8ZLybc-CrY_LHHImeAIjZi1yqQKiw0FQ&s",
      reason: "Contains beta-glucans that stimulate the activity of macrophages and natural killer cells, strengthening innate immune defense."
    },
    {
      name: "Citrus Fruits",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9aZEwHK-EtpZo3A5RB8B5LgEGdUHz_psWg&s",
      reason: "Packed with vitamin C and bioflavonoids, they enhance lymphocyte function and support collagen synthesis in skin barriers."
    },
    {
      name: "Yogurt",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPzvpIx84r13TTKup3BjxPLILOEUOc9jlDA&s",
      reason: "Lactobacillus strains modulate gut microbiota, promoting gut-associated lymphoid tissue (GALT) activity and antibody production."
    },
    {
      name: "Almonds",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-9CaUrS_hIC7QU-m9U0zNk1fR8bKZL5sPnA&s",
      reason: "Rich in Vitamin E, a lipid-soluble antioxidant that protects immune cell membranes from oxidative stress."
    },
    {
      name: "Turmeric Latte",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIlgPXIB0LwX04q5a_wjeqwamURgmuQ9tYQ&s",
      reason: "Curcumin from turmeric regulates pro-inflammatory cytokines (TNF-α, IL-6), supporting immune modulation."
    },
    {
      name: "Kefir",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7A8lsL_jv7E5jO2EnDqmwm7cC_PdrAesDg&s",
      reason: "A fermented drink with over 30 probiotic strains that enhance mucosal immunity and gut microbiota diversity."
    },
    {
      name: "Broccoli Sprouts",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGf8kJtLCAlxYNyM2SyS873LLDAqlbTTcYw&s",
      reason: "Contains sulforaphane, a phytochemical that activates the Nrf2 pathway, increasing antioxidant enzymes."
    },
    {
      name: "Manuka Honey",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ZDLCgoPWAtH_wx6xTh0Yi9R1h_3XIw-yRw&s",
      reason: "Has methylglyoxal (MGO), a powerful antibacterial agent that enhances immune response and wound healing."
    },
    {
      name: "Kimchi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lZ20eQFt9QHWN5k8MLnvSMmLms3GzGE8MQ&s",
      reason: "Fermented with lactic acid bacteria, Kimchi enhances NK cell cytotoxicity and intestinal immunity."
    },
    {
      name: "Elderberry Syrup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UtlhIj4yVk134M5Pd0BqRwBGO1YVYtZYZQ&s",
      reason: "Anthocyanins in elderberries inhibit viral glycoproteins and shorten the duration of cold and flu symptoms."
    },
    {
      name: "Brazil Nuts",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRF7dAKmilgmQpP5CS7rNgqSJQQRovB1a-og&s",
      reason: "Extremely rich in selenium, essential for the function of glutathione peroxidase, a key antioxidant enzyme."
    },
    {
      name: "Bone Broth",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8UHPpJ-UnGB9bhTaX4Vp1Dpnc_kQQa39_w&s",
      reason: "Rich in glycine and collagen, which strengthen the intestinal lining and prevent immune-dampening leaky gut."
    },
    {
      name: "Moringa Leaves",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBh7_5IF-bgWFmsVbohUzEOirehQdYqlC2gw&s",
      reason: "Packed with iron, vitamin A, and chlorogenic acid that enhance white blood cell production and function."
    },
    {
      name: "Green Tea Matcha",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqc5n22srMayMyaKwFZP3vAVBc9stI4l1oA&s",
      reason: "Rich in EGCG, a polyphenol that enhances T-regulatory cell proliferation and reduces inflammation."
    }
  ],

  Acne: [
    {
      name: "Cucumber",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNd0_amGa5ERd4MA52jhyHaTwnwBEcBuQ0Mg&s",
      reason: "High water content hydrates skin, and silica strengthens connective tissue and soothes irritation."
    },
    {
      name: "Green Tea",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeAWIM4zVEnuac0wffXB6p5ZPC1KiPajqcg&s",
      reason: "EGCG suppresses androgen-induced sebum production and inhibits inflammation by reducing IL-1β."
    },
    {
      name: "Walnuts",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcpqB-4jwLQQHxg5Pd1N2Jz3Ra6ji_IiAFQ&s",
      reason: "Loaded with zinc and omega-3s, which reduce inflammatory acne and inhibit P. acnes growth."
    },
    {
      name: "Carrot Juice",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYR2DgauVF_z1zjCwkaXM9v4me2x3UiBO6Q&s",
      reason: "Beta-carotene converts to vitamin A, which regulates skin cell turnover and reduces clogged pores."
    },
    {
      name: "Chia Seeds",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdGrxPa9wqHDk_HfezK83OM7FEEXieIg13VQ&s",
      reason: "Omega-3 ALA reduces inflammatory markers and supports skin barrier integrity."
    },
    {
      name: "Probiotic Yogurt",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPzvpIx84r13TTKup3BjxPLILOEUOc9jlDA&s",
      reason: "Supports gut-skin axis by balancing gut flora, which reduces acne-related inflammation."
    },
    {
      name: "Turmeric Face Mask",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTIlgPXIB0LwX04q5a_wjeqwamURgmuQ9tYQ&s",
      reason: "Topical curcumin inhibits MMP-9 and NF-κB pathways involved in acne inflammation."
    },
    {
      name: "Pumpkin Seeds",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjT195ROBawyS_00a8BdURgNizLo81xs16A&s",
      reason: "Zinc and selenium in pumpkin seeds regulate sebum and promote wound healing."
    },
    {
      name: "Aloe Vera Juice",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxexZJZwxMwW7Q6d6GS1O1qokSjypMUQjakQ&s",
      reason: "Contains polysaccharides and gibberellins that reduce redness and accelerate healing of skin lesions."
    },
    {
      name: "Salmon",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuBoMdapYZD-vKEyoUsW90ihrVu0qM4ZLO9w&s",
      reason: "Astaxanthin and omega-3 fatty acids reduce oxidative damage and skin inflammation."
    },
    {
      name: "Brazil Nuts",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcpqB-4jwLQQHxg5Pd1N2Jz3Ra6ji_IiAFQ&s",
      reason: "Selenium supports detoxification via glutathione and reduces pustule formation."
    },
    {
      name: "Papaya Face Pack",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2hzdXE3PHMDgDfOdu2FDf7VkPid2Je9CEIw&s",
      reason: "Papain enzyme gently exfoliates dead skin and promotes brighter, unclogged pores."
    },
    {
      name: "Flaxseed Oil",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcNxMXSXDk6iQAxIrjUThQn8JL2eGnrhLnA&s",
      reason: "Anti-inflammatory omega-3s from ALA convert to EPA/DHA and calm irritated skin."
    },
    {
      name: "Red Grapes",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9dm8tmgSpbLRN7nVjKpNXtqsj536YZYS-w&s",
      reason: "Resveratrol suppresses C. acnes bacteria and protects skin from UV-induced inflammation."
    },
    {
      name: "Sauerkraut",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhxY2V6CNNpbGn1mkopwiyEXXOC-LIgv_VoA&s",
      reason: "Fermented cabbage with probiotics helps reduce systemic inflammation contributing to acne."
    }
  ],
      Insomnia: [
  { 
    name: "Warm Milk", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL50qlb2ZbtEflIYtqQKXEMKDYdO49jFkwCg&s", 
    reason: "Warm milk contains casein protein, which releases sleep-inducing peptides and promotes the production of serotonin and melatonin—key hormones that regulate the sleep-wake cycle." 
  },
  { 
    name: "Banana", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG7ppeIHto7LDIU8C5ti9idiz_fPCQl4aHHA&s", 
    reason: "Bananas are rich in magnesium and potassium, which relax muscle fibers and nerves, while their natural sugars help transport tryptophan into the brain, aiding in serotonin production." 
  },
  { 
    name: "Almonds", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR3a86_3aDCs5vXlDIRZXcy493n1sc2PZrQ&s", 
    reason: "Almonds provide a natural source of melatonin and magnesium, both essential for reducing inflammation and lowering cortisol, the stress hormone that disrupts sleep." 
  },
  { 
    name: "Chamomile Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSze8cHO960wt9lprg9pLISTgThAoVw5ULkw&s", 
    reason: "Chamomile tea contains apigenin, an antioxidant that binds to GABA receptors in the brain to induce calmness and reduce insomnia symptoms." 
  },
  { 
    name: "Oats", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3ojJVKSxtdiy8XSRrTSg3jk0QeSfs_3lrQ&s", 
    reason: "Oats contain complex carbohydrates that raise insulin levels, facilitating tryptophan entry into the brain and stimulating serotonin synthesis." 
  },
  { 
    name: "Tart Cherry Juice", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPQsQqlxOXo0H4kIReqwmLhK9PBdIxaALVMQ&s", 
    reason: "Tart cherry juice is one of the few natural food sources of melatonin, which helps regulate circadian rhythms and improves both sleep duration and quality." 
  },
  { 
    name: "Pumpkin Seeds", 
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07gTTt-r6GFh7DvL8PU2DUX4bNNbjOE8Y8w&s", 
    reason: "Pumpkin seeds are rich in tryptophan, an amino acid that converts into serotonin and then melatonin, aiding in better sleep regulation." 
  },
  { 
    name: "Passionflower Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSze8cHO960wt9lprg9pLISTgThAoVw5ULkw&s", 
    reason: "Passionflower contains harmala alkaloids which boost GABA levels in the brain, leading to reduced brain activity and a calming sedative effect." 
  },
  { 
    name: "Kiwi", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJGFc-IP38usyI0s1hA4RL3qXKAmkN-NBUjw&s", 
    reason: "Kiwi is a rich source of serotonin and antioxidants like vitamin C and E, which reduce oxidative stress and help improve sleep onset and efficiency." 
  },
  { 
    name: "Hummus", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABICCg5N64NRjeMZoFrxCRsqxMhL5H4Dmmg&s", 
    reason: "Hummus, made from chickpeas, is high in vitamin B6 which is essential for the conversion of tryptophan to melatonin, promoting restful sleep." 
  },
  { 
    name: "Lettuce Water", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaEHYZsKR2-V9mkWy6swdQtt5IpWhU3ViQkw&s", 
    reason: "Lettuce water contains lactucarium, a natural sedative compound that calms the nervous system and mimics the effects of mild opiates." 
  },
  { 
    name: "Walnuts", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcpqB-4jwLQQHxg5Pd1N2Jz3Ra6ji_IiAFQ&s", 
    reason: "Walnuts are a plant-based source of melatonin and healthy omega-3 fatty acids which support brain health and sleep hormone balance." 
  },
  { 
    name: "White Rice", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrpMBEUzXEGur3In3W3nHfnpQ23xa9Zm9RNg&s", 
    reason: "White rice has a high glycemic index that helps speed the availability of tryptophan to the brain, supporting faster sleep onset." 
  },
  { 
    name: "Valerian Root Tea", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS30lJ5TiARSC07bZLuX70MlYfKtlmu-pMhg&s", 
    reason: "Valerian root contains valerenic acid that prevents the breakdown of GABA in the brain, thereby promoting a sense of tranquility and deeper sleep." 
  },
  { 
    name: "Dark Chocolate", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbJXqZU403_eg2zfADr1xGyNtR8ON46jHVA&s", 
    reason: "Dark chocolate contains serotonin precursors and magnesium, which can promote relaxation, though moderation is key due to its caffeine content." 
  }
]

  };

const foodList = healthFoodMap[selectedIssue] || [];
  const handleCardClick = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return (
    <div className="health-page">
      <button onClick={() => navigate("/")} className="back-button">
        🔙 Home
      </button>
      
      <h1 className="title">🍏 Health Food Advisor</h1>
      
      <div className="dropdown-container">
        <select
          value={selectedIssue}
          onChange={(e) => {
            setSelectedIssue(e.target.value);
            setFlippedCards({}); 
          }}
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
              <div 
                key={index} 
                className={`food-card ${flippedCards[index] ? 'flipped' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <img 
                      src={food.image.startsWith("https://") ? food.image : `https://${food.image}`}
                      alt={food.name} 
                      className="food-image" 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                    <h3>{food.name}</h3>
                    <div className="flip-hint">ℹ️ Click for details</div>
                  </div>
                  <div className="card-back">
                    <p className="reason" style={{color:"black"}}>{food.reason}</p>
                    <button 
                      className="flip-back-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(index);
                      }}
                      aria-label="Flip card back"
                    >
                      ↩ Back
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Health;
