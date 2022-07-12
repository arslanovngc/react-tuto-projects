import { useContext } from "react";

import Tour from "./Tour";
import Loading from "./Loading";

const Tours = ({ TourContext }) => {
  const { tours, setTours, loading, fetchTours, api } = useContext(TourContext);

  const removeTour = (id) => {
    const filteredTours = tours.filter((tour) => tour.id != id);
    setTours(filteredTours);
  };

  return (
    <section>
      <div className="title">
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      {loading ? (
        <Loading />
      ) : tours.length === 0 ? (
        <div className="flex">
          <button
            className="btn"
            onClick={() => {
              fetchTours(api);
            }}
          >
            Refresh
          </button>
        </div>
      ) : (
        <div>
          {tours.map((tour) => {
            return <Tour key={tour.id} {...tour} removeTour={removeTour} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Tours;
