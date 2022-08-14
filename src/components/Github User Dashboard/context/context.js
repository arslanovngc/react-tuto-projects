import { useEffect, useState, createContext } from "react";
import mockUser from "./mockData/mockUser";
import mockRepos from "./mockData/mockRepos";
import mockFollowers from "./mockData/mockFollowers";

const Endpoint = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const contextValue = {
    isLoading,
    user,
    repos,
    followers,
  };

  return <GithubContext.Provider value={{ ...contextValue }}>{children}</GithubContext.Provider>;
};

export { GithubProvider, GithubContext };
