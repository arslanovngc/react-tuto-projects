import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return <AppContext.Provider value={isLoading}>{children}</AppContext.Provider>;
};

export { AppProvider };
