import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"


const RequestNew = (props) => {

    let { trip, passenger_request_path } = props;
    trip = trip[0];
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
										<form id="request_trip" action={passenger_request_path} acceptCharset="UTF-8" method="post" style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#ffff"}}>
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
        </div>
      </div>
    );
};

export default RequestNew;