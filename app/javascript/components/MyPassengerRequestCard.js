import React from "react";

export const MyPassengerRequestCard = ({
  passengerRequest = {},
  labelText = "",
  labelColor = "",
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">              
            <span className={[`tag ${labelColor}`]}>{labelText}</span>
          </div>
          <div className="media-content">
            <p className="title is-4">{`Viaje de ${passengerRequest.trip.from_address} a ${passengerRequest.trip.to_address}`}</p>
            <p className="subtitle is-6">
              <time dateTime="2016-1-1">{`Enviada el ${passengerRequest.formatted_created_at}`}</time>
            </p>
          </div>
        </div>

        <div className="content">
          <ul>
            <li>Precio: ${passengerRequest.trip.price}</li>
            <li>Asientos disponibles: {passengerRequest.trip.available_seats}</li>
            <li>Comentario: {passengerRequest.trip.comments}</li>
          </ul>
        </div>

        <footer className="columns is-multiline is-mobile card-footer">
          <div className="card-footer-item column is-half-mobile">
            <div>
              <p className="heading">Auto</p>
              <p className="subtitle">{`${passengerRequest.trip.car_brand}`}</p>
            </div>
          </div>
          <div className="card-footer-item column is-half-mobile">
            <div>
              <p className="heading">Color</p>
              <p className="subtitle">{`${passengerRequest.trip.car_color}`}</p>
            </div>
          </div>
          <div className="card-footer-item column is-full-mobile">
            <div>
              <p className="heading">Patente</p>
              <p className="subtitle">{passengerRequest.trip.car_license_plate}</p>
            </div>
          </div>
          <div className="card-footer-item column is-full-mobile">
            <div>
              <p className="heading">Modelo</p>
              <p className="subtitle">{passengerRequest.trip.car_model}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
