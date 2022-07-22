import { useEffect, useRef } from "react";
import { useGlobalContext } from "../../Context";

const SearchEngine = () => {
  const { setSearchTerm } = useGlobalContext();
  const cocktailName = useRef("");

  function searchHandler() {
    setSearchTerm(cocktailName.current.value);
  }

  function submitHandler(e) {
    e.preventDefault();
  }

  useEffect(() => {
    cocktailName.current.focus();
  }, [cocktailName]);

  return (
    <div className="section search">
      <form className="search-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="cocktail">Enter cocktail name:</label>
          <input type="text" id="cocktail" ref={cocktailName} onChange={searchHandler} />
        </div>
      </form>
    </div>
  );
};

export default SearchEngine;
