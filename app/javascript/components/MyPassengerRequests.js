import React from "react";
import { MyPassengerRequestCard } from "./MyPassengerRequestCard";

const MyPassengerRequests = (props) => {
  const { users_passenger_requests } = props;
  console.log(users_passenger_requests);

  const statusLabels = {
    'accepted': 'Aceptada', 
    'rejected': 'Rechazada', 
    'cancelled': 'Cancelada', 
    'pending': 'Pendiente'
  }

  const statusColors = {
    'accepted': 'is-success', 
    'rejected': 'is-danger', 
    'cancelled': 'is-danger', 
    'pending': 'is-pending'
  }

  return (
    <div className="container is-mobile p-4">
      <div className="columns is-multiline is-mobile is-variable is-8 is-centered">
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
          Mis solicitudes de viaje
        </div>
        {users_passenger_requests.map((passengerRequest) => (
          <MyPassengerRequestCard 
            passengerRequest={passengerRequest} 
            key={passengerRequest.id} 
            labelText={statusLabels[passengerRequest.status]}
            labelColor={statusColors[passengerRequest.status]}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPassengerRequests;
