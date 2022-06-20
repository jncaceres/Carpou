import React from "react";
import { MyPassengerRequestCard } from "./MyPassengerRequestCard";

const MyPassengerRequests = (props) => {
  const { users_passenger_requests, users_from_trips } = props;

  const statusLabels = {
    'accepted': 'Aceptada', 
    'rejected': 'Rechazada', 
    'canceled': 'Cancelada', 
    'pending': 'Pendiente'
  }

  const statusColors = {
    'accepted': 'is-success', 
    'rejected': 'is-danger', 
    'canceled': 'is-dark', 
    'pending': 'is-warning'
  }
  const findUserFromTrip = (passengerRequest) => {
     return users_from_trips.find((user) => user.id === passengerRequest.trip.user_id)
  }

  return (
    <div className="">
      <div className="">
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
          Mis solicitudes de viaje
        </div>
        <div className="">
          {users_passenger_requests.length ? users_passenger_requests.map((passengerRequest) => (
           <div className="block" key={passengerRequest.id}>
            <MyPassengerRequestCard 
                userFromTrip={findUserFromTrip(passengerRequest)}
                passengerRequest={passengerRequest} 
                labelText={statusLabels[passengerRequest.status]}
                labelColor={statusColors[passengerRequest.status]}
              />
            </div>
          )): <p>No tienes solicitudes de viaje actualmente</p>}
        </div>
        <br/>
      </div>
    </div>
  );
};

export default MyPassengerRequests;
