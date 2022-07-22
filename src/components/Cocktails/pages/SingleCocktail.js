import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../Loading";

const SingleCocktail = () => {
  const { urlToCocktail } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function getCocktail() {
      try {
        const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${urlToCocktail}`);
        const data = await resp.json();

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: img,
            strAlcoholic: info,
            strCategory: ctg,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];

          const newCocktail = {
            name: name,
            img: img,
            info: info,
            ctg: ctg,
            glass: glass,
            instructions: instructions,
            ingredients: ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    getCocktail();
  }, [urlToCocktail]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">No any cocktail yet</h2>;
  } else {
    const { name, img, info, ctg, glass, instructions, ingredients } = cocktail;

    return (
      <div className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={img} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">Name: </span>
              {name}
            </p>
            <p>
              <span className="drink-data">Category: </span>
              {ctg}
            </p>
            <p>
              <span className="drink-data">Info: </span>
              {info}
            </p>
            <p>
              <span className="drink-data">Glass: </span>
              {glass}
            </p>
            <p>
              <span className="drink-data">Instructions: </span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">Ingredients: </span>
              {ingredients.map((item, i) => {
                return item ? <span key={i}>{item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleCocktail;
