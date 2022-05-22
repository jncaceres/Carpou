import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"


const MyTrips = (props) => {

    const { today_trips, future_trips, previous_trips } = props;
    return(
        <div className="container is-mobile p-4">
        <div className="columns is-multiline is-mobile is-variable is-8 is-centered">
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
            Mis viajes de hoy
        </div>
        {today_trips.map((trip) => (
        <div className="card column is-one-third-desktop is-half-tablet is-three-quarters-mobile is-mobile my-2 p-4" key={trip.id}>
            <div className="card-image mb-3">
            <Map height={300} defaultCenter={[trip.from.lat, trip.from.long]} defaultZoom={4}>
                <ZoomControl />
                <Marker width={40} anchor={[trip.from.lat, trip.from.long]} />
                <Marker width={40} anchor={[trip.to.lat, trip.to.long]} />
            </Map>
            </div>
            <div className="card-content p-0">
                <div className="media">
                <div className="media-content">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Desde</strong>: {trip.from.name}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Hasta:</strong> {trip.to.name}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Usuario:</strong> {`${trip.user.name} ${trip.user.last_name}`}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Salida:</strong> {new Date(trip.leaving_at).toLocaleString('es-CL')}</p>
                    </div>
                </div>
                </div>
                </div>

                <div className="content">
                    {trip.comments}
                <br/>
                </div>
                <div className="columns is-mobile is-centered mb-1">
                    <button className="button is-primary is-three-quarters" onClick={() => {window.location.href = `${process.env.URL}/trips/${trip.id}`}}>Ver viaje</button>
                </div>
            </div>
        </div>
    ))}
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
            Mis próximos viajes
        </div>
        {future_trips.map((trip) => (
        <div className="card column is-one-third-desktop is-half-tablet is-three-quarters-mobile is-mobile my-2 p-4" key={trip.id}>
            <div className="card-image mb-3">
            <Map height={300} defaultCenter={[trip.from.lat, trip.from.long]} defaultZoom={4}>
                <ZoomControl />
                <Marker width={40} anchor={[trip.from.lat, trip.from.long]} />
                <Marker width={40} anchor={[trip.to.lat, trip.to.long]} />
            </Map>
            </div>
            <div className="card-content p-0">
                <div className="media">
                <div className="media-content">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Desde</strong>: {trip.from.name}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Hasta:</strong> {trip.to.name}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Usuario:</strong> {`${trip.user.name} ${trip.user.last_name}`}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Salida:</strong> {new Date(trip.leaving_at).toLocaleString('es-CL')}</p>
                    </div>
                </div>
                </div>
                </div>

                <div className="content">
                    {trip.comments}
                <br/>
                </div>
                <div className="columns is-mobile is-centered mb-1">
                    <button className="button is-primary is-three-quarters" onClick={() => {window.location.href = `${process.env.URL}/trips/${trip.id}`}}>Ver viaje</button>
                </div>
            </div>
        </div>
    ))}
        <div className="column is-mobile is-full has-text-centered has-text-primary is-size-3 has-text-weight-semibold">
            Mis viajes pasados
        </div>
        {previous_trips.map((trip) => (
        <div className="card column is-one-third-desktop is-half-tablet is-three-quarters-mobile is-mobile my-2 p-4" key={trip.id}>
            <div className="card-image mb-3">
            <Map height={300} defaultCenter={[trip.from.lat, trip.from.long]} defaultZoom={4}>
                <ZoomControl />
                <Marker width={40} anchor={[trip.from.lat, trip.from.long]} />
                <Marker width={40} anchor={[trip.to.lat, trip.to.long]} />
            </Map>
            </div>
            <div className="card-content p-0">
                <div className="media">
                <div className="media-content">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Desde</strong>: {trip.from.name}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Hasta:</strong> {trip.to.name}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Usuario:</strong> {`${trip.user.name} ${trip.user.last_name}`}</p>
                    </div>
                    <div className="column is-half pb-0">
                        <p className="subtitle is-6"><strong>Salida:</strong> {new Date(trip.leaving_at).toLocaleString('es-CL')}</p>
                    </div>
                </div>
                </div>
                </div>

                <div className="content">
                    {trip.comments}
                <br/>
                </div>
                <div className="columns is-mobile is-centered mb-1">
                    <button className="button is-primary is-three-quarters" onClick={() => {window.location.href = `${process.env.URL}/trips/${trip.id}`}}>Ver viaje</button>
                </div>
            </div>
        </div>
    ))}
    </div>
    </div>
    );
};

export default MyTrips;