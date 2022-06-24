import React from "react";

export const TripData = ({ trip = {}, showUser = true }) => {
  return (
    <>
      <div className="columns level is-multiline is-mobile">
        {showUser && (
          <div className="column is-full-mobile">
            <div>
              <p className="heading">Usuario</p>
              <p className="subtitle">{`${trip.user.name}`}</p>
            </div>
          </div>
        )}

        <div className="column level-item has-text-centered is-half-mobile">
          <div>
            <p className="heading">Valor por persona</p>
            <p className="subtitle">{`${trip.price.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}`}</p>
          </div>
        </div>
        <div className="column level-item has-text-centered is-half-mobile">
          <div>
            <p className="heading">Asientos disponibles</p>
            <p className="subtitle">{`${trip.available_seats}`}</p>
          </div>
        </div>
        <div className="column level-item has-text-centered is-full-mobile">
          <div>
            <p className="heading">Salida</p>
            <p className="subtitle">
              {new Date(trip.leaving_at).toLocaleString("es-CL", {
                year: "numeric",
                day: "numeric",
                month: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="column level-item has-text-centered is-full-mobile">
          <div>
            <p className="heading">Comentarios</p>
            <p className="subtitle">{trip.comments}</p>
          </div>
        </div>
      </div>
    </>
  );
};
