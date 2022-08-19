import { useContext } from "react";
import { Navbar, Info, Repos, User, Search } from "../components";
import loader from "./../images/preloader.gif";

import { GithubContext } from "../context/context";

const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar></Navbar>
        <Search />
        <img src={loader} alt="loader" className="loading-img" />
      </main>
    );
  }

  return (
    <main className="section section-center">
      {/* <Navbar></Navbar> */}
      {/* <Search /> */}
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
