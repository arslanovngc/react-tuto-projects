import { useEffect, useState, createContext } from "react";
import axios from "axios";
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
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({ shown: false, msg: "" });

  const searchHandler = async (user) => {
    toggleError();
    setIsLoading(true);

    const resp = await axios(`${Endpoint}/users/${user}`).catch((e) => console.log(e));

    if (resp) {
      setUser(resp.data);

      const { login, followers_url } = resp.data;

      await Promise.allSettled([
        axios(`${Endpoint}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";

          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((e) => console.log(e));
    } else {
      toggleError(true, "User not found!");
    }
    checkRequests();
    setIsLoading(false);
  };

  const checkRequests = () => {
    axios(`${Endpoint}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);

        if (remaining === 0) {
          toggleError(true, "Sorry, you have not request limit yet!");
        }
      })
      .catch((e) => console.log(e));
  };

  function toggleError(shown = false, msg = "") {
    setError({ shown, msg });
  }

  useEffect(() => {
    checkRequests();
  }, [requests]);

  const contextValue = {
    isLoading,
    user,
    repos,
    followers,
    requests,
    error,
    searchHandler,
  };

  return <GithubContext.Provider value={{ ...contextValue }}>{children}</GithubContext.Provider>;
};

export { GithubProvider, GithubContext };
