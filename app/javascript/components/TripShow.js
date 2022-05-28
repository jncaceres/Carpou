import React from "react";
import { TripData } from "./TripData";
import { TripMap } from "./TripMap";
import { routes } from "../api";
import { TripPassengerRequests } from "./TripPassengerRequests";
import { TripButton } from "./TripButton";

const passengerRequests = [
  {
    name: "John Smith",
    phone: "987766201",
    email: "john@gmail.com",
    comments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
  },
  {
    name: "Smith Jon Jones",
    phone: "987766201",
    email: "john@gmail.com",
    comments:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
  },
];

const TripShow = (props) => {
  const { trip, user } = props;

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
            route={routes.passenger_requests.new()}
          />
        </>
      )}
    </>
  );
};

export default TripShow;
