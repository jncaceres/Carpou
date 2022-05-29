import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

export const TripMap = (props) => {
  const { trip } = props;
  return (
    <>
      <Map
        height={200}
        defaultCenter={[trip.from.lat, trip.from.long]}
        defaultZoom={7}
      >
        <ZoomControl />
        <Marker width={40} anchor={[trip.from.lat, trip.from.long]} />
        <Marker width={40} anchor={[trip.to.lat, trip.to.long]} />
      </Map>
    </>
  );
};
