import React from "react";

const editTrip = (props) =>{
  const {user, edit_trip_path, places, notice, trip} = props;
  
 

  return (
      <form action={edit_trip_path}
      method="post"
      acceptCharset="UTF-8" 
      style={{border: "1px solid #f5efef", padding: 5,
      borderRadius: 10, backgroundColor: "#ffff"}}>
           <input type="hidden" name="_method" value="put" />
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
          <div className="field">
            <div className="control">
              <p>{notice}</p>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[from_address]' placeholder='Dirección de origen' defaultValue={trip.from_address} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[to_address]' placeholder='Dirección de destino' defaultValue={trip.to_address} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='number' name='trip[available_seats]' placeholder='Número de asientos disponibles' defaultValue={trip.available_seats} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='datetime-local' name='trip[leaving_at]' placeholder='Hora de salida' defaultValue={trip.leaving_at} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[price]' placeholder='Monto a pagar' defaultValue={trip.price} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[comments]' placeholder='Comentario' defaultValue={trip.comments} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[car_license_plate]' placeholder='Patente' defaultValue={trip.car_license_plate} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[car_brand]' placeholder='Marca del auto' defaultValue={trip.car_brand} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[car_model]' placeholder='Modelo del auto' defaultValue={trip.car_model} required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='trip[car_color]' placeholder='Color del auto' defaultValue={trip.car_color} required/>
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
              <label>Viajo desde...</label>
              <select className="input" name='trip[from_id]'>
                {places.map((el)=>(
                   el.id == trip.from_id ?
                  // eslint-disable-next-line react/jsx-key
                  <option selected value={el.id}>{el.name}</option> 
                  : <option value={el.id}>{el.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label>Viajo hacia...</label>
            <select className="input" name = 'trip[to_id]'>
                {places.map((el)=>(
                  // eslint-disable-next-line react/jsx-key
                  el.id == trip.to_id ?
                  // eslint-disable-next-line react/jsx-key
                  <option selected value={el.id}>{el.name}</option> 
                  : <option value={el.id}>{el.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" type='submit'>Editar viaje</button>
           </div>           
          </div>
      </form>


  ); 
}

export default editTrip;