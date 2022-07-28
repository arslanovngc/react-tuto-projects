import { useEffect, useState } from "react";
import paginate from "./utils";

const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    setUsers(paginate(data));
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { loading, users };
};

export default useFetch;
