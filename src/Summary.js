import React, { useEffect, useState } from "react";

function Summary({ foodItem, onSummaryReady }) {
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    if (!foodItem || !apiKey) return;

    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
              role: "user",
              content: `Give a short summary of the food item "${foodItem}". Include meal type (breakfast/lunch/etc.), cuisine type, calorie range, and a short description.`,
            }],
            temperature: 0.7,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "Unknown error");

        const summaryText = data.choices?.[0]?.message?.content || "No summary found.";
        onSummaryReady(summaryText);
      } catch (error) {
        console.error("Error fetching summary:", error);
        onSummaryReady("Failed to fetch summary. Please try again.");
      } finally {
        setLoading(false);
        console.log("Triggered Summary for:", foodItem);

      }
    };

    fetchSummary();
  }, [foodItem, apiKey, onSummaryReady]);

  return null; // This component doesn't render anything visible
}

export default Summary;