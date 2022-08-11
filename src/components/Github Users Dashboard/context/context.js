import { useEffect, useState, createContext } from "react";

const Endpoint = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return <GithubContext.Provider value={{ isLoading }}>{children}</GithubContext.Provider>;
};

export { GithubProvider, GithubContext };
