import React from "react";
import TripForm from "./TripForm";

const NewTrip = (props) => {
  const { user,  places } = props;

  return (
    <div className="container">
      <br/>
      <h1 className="title">Crea un nuevo viaje</h1>
      <TripForm user={user} places={places} />
    </div>
  ); 
}

export default NewTrip;