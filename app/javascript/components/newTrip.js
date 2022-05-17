import React from "react";
import Select from "react-select";

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
              <input className="input" type='time' name='leaving_at' placeholder='Hora de salida' required/>
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
                name="user_id" 
                value={user.id}
                autoComplete="off">
                </input>
            </div>      
          </div>
          <div className="field">
            <div className="control">
              <Select options={places} name="from_id" placeholder="Viajo desde..."/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Select options={places} name="to_id" placeholder="Viajo hacia..."  />
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