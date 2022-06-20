import React from "react";
import TripForm from "./TripForm";

const EditTrip = (props) => {

  const { user, places, trip } = props;
 
  return (
    <div className="container">
    <br/>
    <h1 className="title">Edita un viaje</h1>
    <TripForm user={user} places={places} trip={trip} />
  </div>
  ); 
}

export default EditTrip;
