import React from "react";
import { routes } from "../api";

const TripForm = (props) => {

    const { user,  places, trip } = props;
    return (
        <form action={trip ? routes.trips.update(trip.id) : routes.trips.post()}
            method="post"
            acceptCharset="UTF-8" 
            style={{border: "1px solid #f5efef", padding: 20,
            borderRadius: 10, backgroundColor: "#f5efef"}}>
              { trip && <input type="hidden" name="_method" value="put" />}
          <div className="field">
            <div className="control">
                <input 
                    type="hidden" 
                    name="authenticity_token" 
                    value={document.getElementsByName("csrf-token")[0].getAttribute("content")}
                    autoComplete="off">
                </input>
            </div>      
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <label className="label">Viajo desde...</label>
                <div className="control">
                  <select className="input" name='trip[from_id]' defaultValue={trip?.from_id}>
                  {places.map((place) => (
                    <option 
                        key={place.id} 
                        value={place.id}>{place.name} 
                    </option> 
                    ))}
                  </select>
                </div>
              </div>
              <div className="field is-expanded">
                <label className="label">Viajo hacia...</label>
                <div className="control">
                  <select className="input" name = 'trip[to_id]' defaultValue={trip?.to_id}>
                    {places.map((place) => (
                        <option 
                            key={place.id} 
                            value={place.id}>{place.name} 
                        </option> 
                    ))}
                    </select>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[from_address]' placeholder='Dirección de origen' defaultValue={trip?.from_address} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[to_address]' placeholder='Dirección de destino' defaultValue={trip?.from_address} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='number' name='trip[available_seats]' placeholder='Número de asientos disponibles' defaultValue={trip?.available_seats} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[price]' placeholder='Monto a pagar' defaultValue={trip?.price} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='datetime-local' name='trip[leaving_at]' placeholder='Hora de salida' defaultValue={trip?.leaving_at} required/>
                </div>
              </div>
            </div>
          </div>
          <label className="label">Información del auto: </label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[car_license_plate]' placeholder='Patente' defaultValue={trip?.car_license_plate} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[car_brand]' placeholder='Marca del auto' defaultValue={trip?.car_brand} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[car_model]' placeholder='Modelo del auto' defaultValue={trip?.car_model} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='trip[car_color]' placeholder='Color del auto' defaultValue={trip?.car_color} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
                <input 
                type="hidden" 
                name='trip[user_id]' 
                value={user.id}>
                </input>
            </div>      
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[comments]' placeholder='Comentario' defaultValue={trip?.comments} required/>
            </div>
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" type='submit'>{trip ? 'Editar viaje' : 'Crear viaje'}</button>
           </div>           
          </div>
      </form>
    )

}
export default TripForm;