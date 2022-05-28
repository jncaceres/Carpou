import React from "react";
import { TripPassengerRequestCard } from "./TripPassengerRequestCard";

export const TripPassengerRequests = (props) => {
  const { passengerRequests } = props;

  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-full">
        <div className="content"></div>
        <h1 className="h1">Solicitudes pendientes</h1>
      </div>
      {passengerRequests.map((pr, key) => (
        <div key={key} className="column is-full-mobile">
          <TripPassengerRequestCard passengerRequest={pr} />
        </div>
      ))}
      <div className="column is-full">
        <div className="content"></div>
        <h1 className="h1">Solicitudes Aceptadas</h1>
      </div>
      {passengerRequests.map((pr, key) => (
        <div key={key} className="column is-full-mobile">
          <TripPassengerRequestCard passengerRequest={pr} showButtons={false} />
        </div>
      ))}
    </div>
  );
};
