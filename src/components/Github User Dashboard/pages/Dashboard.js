import { useContext } from "react";
import styled from "styled-components";
import { Navbar, Info, Repos, User, Search } from "../components";
import loader from "./../images/preloader.gif";

import { GithubContext } from "../context/context";

const Dashboard = () => {
  const { isLoading, error } = useContext(GithubContext);

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
    <main>
      <Navbar></Navbar>
      <Search />
      {error.shown ? (
        <ErrorWrapper className="section-center">
          <p>{error.msg}</p>
        </ErrorWrapper>
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

const ErrorWrapper = styled.article`
  display: flex;
  justify-content: center;
  background: #fff;
  padding: 5px 0;
  text-transform: capitalize;
  p {
    margin: 0 auto;
    font-size: 1.4em;
    color: red;
    letter-spacing: var(--spacing);
  }
`;

export default Dashboard;
