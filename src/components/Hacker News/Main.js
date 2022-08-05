import SearchForm from "./SearchForm";
import Button from "./Button";
import Stories from "./Stories";
import { useGlobalContext } from "./context";
import "./main.css";

const Main = () => {
  const { hits } = useGlobalContext();

  return (
    <>
      <SearchForm />
      {hits.length <= 0 ? (
        <div className="not-found">
          <h3>Any news was found matching your query</h3>
        </div>
      ) : (
        <>
          <Stories />
          <Button />
        </>
      )}
    </>
  );
};

export default Main;
