import Cocktail from "./Cocktail";
import Loading from "./Loading";

import { useGlobalContext } from "../../Context";

const List = () => {
  const { isLoading, cocktails } = useGlobalContext();


  if (isLoading) {
    return <Loading />;
  }

  if (cocktails.length < 1) {
    return <h2 className="section-title">No matching drinks were found for your request</h2>;
  }

  return (
    <div className="section">
      <h2 className="section-title">Cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </div>
    </div>
  );
};

export default List;
