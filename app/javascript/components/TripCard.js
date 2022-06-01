import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { routes } from "../api";

const TripCard = (props) => {
  const { trip } = props;
  return (
    <div
      className="card column is-one-third-desktop is-half-tablet is-three-quarters-mobile is-mobile my-2 p-4"
      key={trip.id}
    >
      <div className="card-image mb-3">
        <Map
          height={300}
          defaultCenter={[trip.from.lat, trip.from.long]}
          defaultZoom={4}
        >
          <ZoomControl />
          <Marker width={40} anchor={[trip.from.lat, trip.from.long]} />
          <Marker width={40} anchor={[trip.to.lat, trip.to.long]} />
        </Map>
      </div>
      <div className="card-content p-0">
        <div className="media">
          <div className="media-content" style={{overflowX: 'unset'}}>
            <div className="columns is-multiline is-mobile">
              <div className="column is-half pb-0">
                <p className="subtitle is-6">
                  <strong>Desde</strong>: {trip.from.name}
                </p>
              </div>
              <div className="column is-half pb-0">
                <p className="subtitle is-6">
                  <strong>Hasta:</strong> {trip.to.name}
                </p>
              </div>
              <div className="column is-half pb-0">
                <p className="subtitle is-6">
                  <strong>Usuario:</strong>{" "}
                  {`${trip.user.name} ${trip.user.last_name}`}
                </p>
              </div>
              <div className="column is-half pb-0">
                <p className="subtitle is-6">
                  <strong>Salida:</strong>{" "}
                  {new Date(trip.leaving_at).toLocaleString("es-CL")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          {trip.comments}
          <br />
        </div>
        <div className="columns is-mobile is-centered mb-1">
          <a href={routes.trips.show(trip.id)}>
            <button className="button is-primary is-three-quarters">
              Ver viaje
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
