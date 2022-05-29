import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"


const TripShow = (props) => {
    const { trip, passenger_request_path } = props;
    return(
      <div className="columns is-multiline is-mobile is-centered m-4">
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
            Viaje desde {`${trip.from.name} a ${trip.to.name}`} 
        </div>
        <div className="columns is-mobile is-centered is-multiline">
            <div className="column is-half-desktop is-half-tablet is-full-mobile is-mobile">
            <Map height={500} defaultCenter={[trip.from.lat, trip.from.long]} defaultZoom={4}>
                <ZoomControl />
                <Marker width={40} anchor={[trip.from.lat, trip.from.long]} />
                <Marker width={40} anchor={[trip.to.lat, trip.to.long]} />
            </Map>
            </div>
            <div className="column is-full-mobile is-half-tablet is-half-desktop is-mobile">
              <div className="columns is-multiline is-mobile pt-5">
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Usuario:</strong> {`${trip.user.name} ${trip.user.last_name}`}</p>
                  </div>
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Email usuario:</strong> {trip.user.email}</p>
                  </div>
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Telefono usuario:</strong> {trip.user.phone}</p>
                  </div>
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Dirección de salida: </strong>: {trip.from_address}</p>
                  </div>
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Dirección de llegada:</strong> {trip.to_address}</p>
                  </div>
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Asientos disponibles:</strong> {trip.available_seats}</p>
                  </div>
                  <div className="column is-full pb-5 has-text-centered-mobile	">
                      <p className="subtitle is-5"><strong>Salida:</strong> {new Date(trip.leaving_at).toLocaleString('es-CL')}</p>
                  </div>
                  <div className="column is-full is-mobile is-centered pb-5 has-text-centered-mobile	">
                    <button className="button is-primary" onClick={() => window.location.href = passenger_request_path + "?trip_id=" + trip.id}>Solicitar unirme al viaje</button>
                  </div>
              </div>
            </div>
        </div>
        </div>
    );
};

export default TripShow;