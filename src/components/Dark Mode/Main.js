import { useState, useEffect } from "react";
import Article from "./Article";
import { articles as data } from "./data";
import "./main.css";

const getTheme = () => {
  let theme = "light-theme";

  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }

  return theme;
};

const Main = () => {
  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else setTheme("light-theme");
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main>
      <nav>
        <div className="nav-center">
          <h1>Theme</h1>
          <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((article) => {
          return <Article key={article.id} {...article} />;
        })}
      </section>
    </main>
  );
};

export default Main;
