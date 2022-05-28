import React from "react";

export const TripPassengerRequestCard = ({
  passengerRequest = {},
  showButtons = true,
  labelText = "",
  labelColor = "",
  handleAccept,
  handleReject,
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{`${passengerRequest.user.name} ${passengerRequest.user.last_name}`}</p>
            {labelText ? (
              <span className={[`tag ${labelColor}`]}>{labelText}</span>
            ) : (
              <p className="subtitle is-6">Desea unirse a tu viaje</p>
            )}
          </div>
        </div>

        <div className="content">{passengerRequest.comments}</div>

        <div className="columns is-multiline is-mobile">
          <div className="column is-half-mobile">
            <div>
              <p className="heading">Edad</p>
              <p className="subtitle">{`${passengerRequest.user.age}`}</p>
            </div>
          </div>
          <div className="column is-half-mobile">
            <div>
              <p className="heading">Género</p>
              <p className="subtitle">{`${passengerRequest.user.gender}`}</p>
            </div>
          </div>
          <div className="column is-full-mobile">
            <div>
              <p className="heading">Teléfono</p>
              <p className="subtitle">{`${passengerRequest.user.phone}`}</p>
            </div>
          </div>
          <div className="column is-full-mobile">
            <div>
              <p className="heading">Email</p>
              <p className="subtitle">{`${passengerRequest.user.email}`}</p>
            </div>
          </div>
        </div>
        <div>
          <time dateTime="2016-1-1">{`Enviada el ${passengerRequest.formatted_created_at}`}</time>
        </div>

        <br />

        {showButtons && (
          <div className="columns is-mobile">
            <div className="column">
              <button
                className="button is-primary"
                onClick={() => handleAccept(passengerRequest)}
              >
                Aceptar
              </button>
            </div>
            <div className="column">
              <a>
                <button
                  className="button is-danger"
                  onClick={() => handleReject(passengerRequest)}
                >
                  Rechazar
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
