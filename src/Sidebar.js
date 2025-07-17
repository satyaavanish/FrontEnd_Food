import React, { useEffect, useState } from "react";
import { dishObserver } from "./Observer";

function Sidebar() {
  const [detectedDish, setDetectedDish] = useState("");

  useEffect(() => {
    const unsubscribe = dishObserver.subscribe((dish) => {
      setDetectedDish(dish);
    });

    return () => unsubscribe();  
  }, []);

  return <p>🔔 Current dish detected: {detectedDish}</p>;
}

export default Sidebar;
