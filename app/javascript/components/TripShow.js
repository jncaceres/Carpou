import React from "react";
import { TripData } from "./TripData";
import { TripMap } from "./TripMap";
import { routes } from "../api";
import { TripPassengerRequests } from "./TripPassengerRequests";
import { TripButton } from "./TripButton";

const TripShow = (props) => {
  const { trip, user, passengerRequests } = props;

  return (
    <>
      {user && user.id == trip.user.id ? (
        <>
          <div className="columns is-mobile">
            <div className="column is-full-mobile">
              <div className="title mb-1">
                Mi viaje desde {`${trip.from.name} a ${trip.to.name}`}
              </div>
            </div>
          </div>
          <TripData trip={trip} showUser={false} />
          <TripButton buttonText="Editar viaje" route={routes.trips.edit(trip.id)} />
          <TripPassengerRequests passengerRequests={passengerRequests} />
        </>
      ) : (
        <>
          <div className="columns is-multiline is-mobile">
            <div className="column is-full-mobile title mb-1">
              Viaje desde {`${trip.from.name} a ${trip.to.name}`}
            </div>
            <div className="column is-full-mobile">
              <TripMap trip={trip} />
            </div>
          </div>
          <TripData trip={trip} />
          <TripButton
            buttonText="Solicitar unirme al viaje"
            route={routes.passenger_requests.new() + `?trip_id=${trip.id}`}
          />
        </>
      )}
    </>
  );
};

export default TripShow;