import React from "react";
import TripCard from "./TripCard";

const MyTrips = (props) => {
  const { today_trips, future_trips, previous_trips } = props;
  return (
    <div className="container is-mobile p-4">
      <div className="columns is-multiline is-mobile is-variable is-8 is-centered">
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
          Mis viajes de hoy
        </div>
        {today_trips.map((trip) => (
          <TripCard trip={trip} key={trip.id} />
        ))}
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
          Mis próximos viajes
        </div>
        {future_trips.map((trip) => (
          <TripCard trip={trip} key={trip.id} />
        ))}
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
          Mis viajes pasados
        </div>
        {previous_trips.map((trip) => (
          <TripCard trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
