import React from "react";

export const MyPassengerRequestCard = ({
  userFromTrip = {},
  passengerRequest = {},
  labelText = "",
  labelColor = "",
}) => {
  return (
    <div className="card is-full">
      <div className="card-content">
        <div className="media">
          <div className="media-left">              
            <span className={[`tag ${labelColor}`]}>{labelText}</span>
          </div>
          <div className="media-content">
            <p className="title is-4">Solicitud de viaje</p>
            <p className="subtitle is-6">{`Sale desde ${passengerRequest.trip.from_address} a ${passengerRequest.trip.to_address}`}</p>
            <p className="subtitle is-6">
              <time dateTime="2016-1-1">{`Enviada el ${passengerRequest.formatted_created_at}`}</time>
            </p>
          </div>
        </div>

        <div className="content">
          <div className="columns">
            <div className="column is-half">
              <ul>
                <li>Precio: ${passengerRequest.trip.price}</li>
                <li>Asientos disponibles: {passengerRequest.trip.available_seats}</li>
                <li>Comentario: {passengerRequest.trip.comments}</li>
              </ul>
            </div>
            <div className="column is-half">
              {labelText === 'Aceptada' && (
              <div>
                <p className="subtitle is-6">Información de Usuario</p>
                <ul>
                  <li>Nombre: {userFromTrip.name} {userFromTrip.last_name}</li>
                  <li>Teléfono: {userFromTrip.phone}</li>
                  <li>Email: {userFromTrip.email}</li>
                </ul>
              </div>
              )}
            </div>
          </div>
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
