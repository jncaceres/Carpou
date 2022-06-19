import React from "react";
import { TripData } from "./TripData";
import { TripMap } from "./TripMap";
import { routes } from "../api";
import { TripPassengerRequests } from "./TripPassengerRequests";
import { TripButton } from "./TripButton";

const TripShow = (props) => {
  const { trip, user, passengerRequests } = props;

  return (
    <div className="container">
      <br/>
      {user && user.id == trip.user.id ? (
        <>
          <div className="columns container is-mobile">
            <div className="column is-full-mobile ">
              <div className="title">
                Detalle de mi viaje
              </div>
              <div className="subtitle mb-1">
                Viaje desde {`${trip.from.name} a ${trip.to.name}`}
              </div>
            </div>
            <div className="column is-full-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
              <TripButton buttonText="Editar viaje" route={routes.trips.edit(trip.id)} />
            </div>
          </div>
          <div className="columns is-centered block">
            <div className="column is-full-mobile">
              <TripData trip={trip} showUser={false} />
            </div>
          </div>
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
            route={routes.passenger_requests.new({trip_id: trip.id})}
          />
        </>
      )}
    </div>
  );
};

export default TripShow;