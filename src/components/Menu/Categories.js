const Categories = ({ categories, filterCategory }) => {
  return (
    <div className="btn-container">
      {categories.map((category, i) => {
        return (
          <button
            type="button"
            className={`${"filter-btn"} ${category}`}
            key={i}
            onClick={(e) => {
              filterCategory(category);
              const categoryBtn = e.target.innerText.toLowerCase();
              const childes = e.nativeEvent.path[1].childNodes;

              for (let i = 0; i < childes.length; i++) {
                childes[i].classList.remove("active");
                if (childes[i].innerText.toLowerCase() === categoryBtn) {
                  e.target.classList.add("active");
                } else {
                  childes[i].classList.remove("all");
                }
              }
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
