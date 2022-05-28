import React from "react";

const newTrip = (props) =>{
  const {user, new_trip_path, places,notice} = props;

  return (
      <form action = {new_trip_path}
      method="post"
      acceptCharset="UTF-8" 
      style={{border: "1px solid #f5efef", padding: 5,
      borderRadius: 10, backgroundColor: "#ffff"}}>
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
              <input className="input" type='text' name='from_address' placeholder='Dirección de origen' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='to_address' placeholder='Dirección de destino' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='number' name='available_seats' placeholder='Número de asientos disponibles' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='datetime-local' name='leaving_at' placeholder='Hora de salida' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='price' placeholder='Monto a pagar' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='comments' placeholder='Comentario' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='car_license_plate' placeholder='Patente' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='car_brand' placeholder='Marca del auto' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='car_model' placeholder='Modelo del auto' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='car_color' placeholder='Color del auto' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
                <input 
                type="hidden" 
                name='user_id' 
                value={user.id}>
                </input>
  

            </div>      
          </div>
          <div className="field">
            <div className="control">
              <label>Viajo desde...</label>
              <select className="input" name='from_id'>
                {places.map((option)=>(
                  // eslint-disable-next-line react/jsx-key
                  <option value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label>Viajo hacia...</label>
            <select className="input" name = 'to_id'>
                {places.map((option)=>(
                  // eslint-disable-next-line react/jsx-key
                  <option value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" type='submit'>Crear viaje</button>
           </div>           
          </div>
      </form>


  ); 
}

export default newTrip;