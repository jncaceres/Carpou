import React,{ useState } from "react";
import TripCard from "./TripCard";

const MyTrips = (props) => {
  const { today_trips, future_trips, previous_trips } = props;
  const [trips, setTrips] = useState(today_trips);
  const [activeTab, setActiveTab] = useState(1);

  const setNewTab = (tripsForTab, tab) => {
    setTrips(tripsForTab)
    setActiveTab(tab)
  }

  return (
    <div className="container is-mobile p-4">
      <div className="tabs is-fullwidth is-toggle">
        <ul>
          <li className={activeTab === 1 ? 'is-active' : ''}>
            <a className="title is-5" onClick={() => setNewTab(today_trips, 1)}>Viajes de hoy</a>
          </li>
          <li className={activeTab === 2 ? 'is-active' : ''}>
            <a className="title is-5" onClick={() => setNewTab(future_trips, 2)}>Próximos viajes</a>
          </li>
          <li className={activeTab === 3 ? 'is-active' : ''}>
            <a className="title is-5" onClick={() => setNewTab(previous_trips, 3)}>Viajes pasados</a>
          </li>
        </ul>
      </div>
      <div className="columns is-multiline is-mobile is-variable is-centered">
        {trips.length !== 0 ? trips.map((trip) => (
          <div className="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-third-fullhd" key={trip.id}>
            <TripCard trip={trip} key={trip.id} />
          </div>
        )): 
        (<div className="has-text-centered">
            <br/>
            <h1 className="subtitle">No hay viajes por el momento</h1>
          </div>)
        }
      </div>
    </div>
  );
};

export default MyTrips;
