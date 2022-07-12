import { useState } from "react";

import Menu from "./Menu";
import Categories from "./Categories";
import allData from "./data";

import "./Main.css";

const allCategories = ["all", ...new Set(allData.map((data) => data.category))];

const Main = () => {
  const [menuItems, setMenuItems] = useState(allData);
  const [categories, setCategories] = useState(allCategories);

  const filterCategory = (category) => {
    if (category === "all") {
      setMenuItems(allData);
      return;
    }

    const newItems = allData.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our Menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} filterCategory={filterCategory} />
        <Menu menuItems={menuItems} />
      </section>
    </main>
  );
};

export default Main;
