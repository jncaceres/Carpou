import React from "react";
import { TripData } from "./TripData";
import { TripMap } from "./TripMap";
import { routes } from "../api";
import { TripPassengerRequests } from "./TripPassengerRequests";
import { TripButton } from "./TripButton";
import { DeleteTripButton } from "./DeleteTripButton";

const TripShow = (props) => {
  const { trip, user, passengerRequests } = props;

  const usersInTripIds = trip.users.map((user) => user.id);

  return (
    <div className="container">
      <br />
      {user && user.id == trip.user.id ? (
        <>
          <div className="columns container is-mobile">
            <div className="column is-full-mobile ">
              <div className="title">Detalle de mi viaje</div>
              <div className="subtitle mb-1">
                Viaje desde {`${trip.from.name} a ${trip.to.name}`}
              </div>
            </div>
            <div className="column is-full-mobile is-one-third-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
              <TripButton
                buttonText="Editar viaje"
                route={routes.trips.edit(trip.id)}
              />
              <DeleteTripButton
                buttonText="Cancelar viaje"
                route={routes.trips.delete(trip.id)}
              />
            </div>
          </div>
          <TripData trip={trip} showUser={false} />
          <TripPassengerRequests passengerRequests={passengerRequests} />
        </>
      ) : (
        <>
          <div className="columns is-multiline is-centered">
            <div className="column has-text-centered is-full-mobile is-full-tablet is-full-desktop is-three-quarters-widescreen is-two-thirds-fullhd mb-1">
              <h1 className="title block">
                Viaje desde {`${trip.from.name} a ${trip.to.name}`}
              </h1>
              <TripMap trip={trip} height={350} />
            </div>
            <div className="column is-full-mobile is-full-tablet is-full-desktop is-three-quarters-widescreen is-two-thirds-fullhd">
              <TripData trip={trip} />
              {!usersInTripIds.includes(user.id) && (
                <div className="block">
                  <TripButton
                    buttonText="Solicitar unirme al viaje"
                    route={routes.passenger_requests.new({ trip_id: trip.id })}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TripShow;
