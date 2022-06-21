import React from "react";
import TripForm from "./TripForm";
import { routes } from "../api";
const EditTrip = (props) => {

  const { user, places, trip } = props;
  
 
  return (
    <div className="container">
    <br/>
    <h1 className="title">Edita un viaje</h1>

    <div className="field">
        <div className="control">
          <a href={routes.trips.show(trip.id)}>
            <button className="button is-primary is-fullwidth" type="submit">
              Cancelar
            </button>
          </a>
        </div>
      </div>
    <TripForm user={user} places={places} trip={trip} />
  </div>
  ); 
}

export default EditTrip;
