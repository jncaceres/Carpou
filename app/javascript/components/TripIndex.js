import React from "react";
import TripCard from "./TripCard";

const TripIndex = (props) => {
  const { trips } = props;
  return (
    <div className="container is-mobile p-4">
      <div className="columns is-multiline is-mobile is-variable is-8 is-centered">
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
          Viajes disponibles
        </div>
        {trips.length ? (
          trips.map((trip) => <TripCard trip={trip} key={trip.id} />)
        ) : (
          <div>No se encontraron viajes disponibles</div>
        )}
      </div>
    </div>
  );
};

export default TripIndex;
