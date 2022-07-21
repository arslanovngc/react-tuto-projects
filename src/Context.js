import { createContext, useState, useEffect, useCallback, useContext } from "react";

const urlDrink = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${urlDrink}${searchTerm}`);
      const { drinks } = await response.json();

      if (drinks) {
        const newCocktails = drinks.map(({ idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass }) => {
          return {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      }
    } catch (error) {
      console.log(error);
    }
    
    setIsLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider value={{ isLoading, cocktails, searchTerm, setSearchTerm }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
