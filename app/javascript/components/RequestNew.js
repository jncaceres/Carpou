import React from "react";
import { TripData } from "./TripData";
import { TripMap } from "./TripMap";
import { routes } from "../api";

const RequestNew = (props) => {
  let {trip}  = props;
  trip = trip[0];
  return (
    <>
      <div className="columns is-multiline is-centered">
        <div className="column has-text-centered is-full-mobile is-full-tablet is-full-desktop is-three-quarters-widescreen is-two-thirds-fullhd mb-1">
          <h1 className="title block">Viaje desde {`${trip.from.name} a ${trip.to.name}`}</h1>
          <TripMap trip={trip} height={350} />
        </div>
        <div className="column is-full-mobile is-full-tablet is-full-desktop is-three-quarters-widescreen is-two-thirds-fullhd">
          <TripData trip={trip} />
          <div className="card">
            <form id="request_trip" action={routes.passenger_requests.create()} acceptCharset="UTF-8" method="post" style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#f5efef"}}>
              <div className="field">
                <div className="control">
                  <input type="hidden" name="authenticity_token" value={document.getElementsByName("csrf-token")[0].getAttribute("content")} autoComplete="off"></input>
                </div>
                <div className="control">
                  <input type="hidden" name="passenger_request[trip_id]" value={trip.id} autoComplete="off"></input>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label> Agrega un comentario que le pueda interesar al conductor (Opcional) </label>
                </div>
                <br></br>
                <div className="control">
                  <textarea className="input" id="comment" name="passenger_request[comments]" col="40" row="6" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input className="button is-primary is-fullwidth" type="submit" name="commit" value="Enviar solicitud"></input>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default RequestNew;