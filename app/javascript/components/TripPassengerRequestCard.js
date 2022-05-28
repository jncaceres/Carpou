import React from "react";

export const TripPassengerRequestCard = ({
  passengerRequest = {},
  showButtons = true,
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{passengerRequest.name}</p>
            <p className="subtitle is-6">Desea unirse a tu viaje</p>
          </div>
        </div>

        <div className="content">
          {passengerRequest.comments}
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          <div>phone: 987766201</div>
          <div>email: john@gmail.com</div>
        </div>
        {showButtons && (
          <div className="columns is-mobile">
            <div className="column">
              <a>
                <button className="button is-primary">Aceptar</button>
              </a>
            </div>
            <div className="column">
              <a>
                <button className="button is-danger">Rechazar</button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
