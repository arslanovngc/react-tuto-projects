import React, { useState, useEffect } from "react";
import Tours from "./Tours";

import "./Main.css";

const api = "https://course-api.com/react-tours-project";

const TourContext = React.createContext();

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const fetchTours = async (url) => {
    setLoading(true);

    try {
      const resp = await fetch(url, {
        method: "GET",
        mode: "cors",
      });
      const tours = await resp.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours(api);
  }, []);

  return (
    <main>
      <TourContext.Provider value={{ tours, setTours, loading, setLoading, fetchTours, api }}>
        <Tours TourContext={TourContext} />
      </TourContext.Provider>
    </main>
  );
};

export default Main;
