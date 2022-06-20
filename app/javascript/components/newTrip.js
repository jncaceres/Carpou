import React, { useState } from "react";
import { routes } from "../api";
import Select from "react-select";
const newTrip = (props) =>{
  const {user,  places,notice} = props;
  const options = places.map((place) => ({
    value: place.id,
    label: place.name,
  }));
  const [inputValues, setInputValues] = useState({
    authenticity_token: document.getElementsByName("csrf-token")[0].getAttribute("content"),
    trip:{
      from_id: options[0],
      to_id: options[options.length - 1],
      from_address: '',
      to_adrress: '',
      available_seats: '',
      leaving_at:'',
      price:'',
      comments: '',
      car_license_plate: '',
      car_brand:'',
      car_model:'',
      car_color: '',
      user_id: user.id
    }
  });

  const handleChange = (e) => {
    console.log(e.target);
    console.log(inputValues);
    const { name, value } = e.target;
    console.log(name, value);
    setInputValues({ ...inputValues, [name]: value });
    console.log(inputValues);

  }
  const sendData = (data) =>{
    fetch(routes.trips.post(),{
      method:"POST",
      body: data
    })

  }  
  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
      <form 
      onSubmit={handleSubmit}
      acceptCharset="UTF-8" 
      style={{border: "1px solid #f5efef", padding: 5,
      borderRadius: 10, backgroundColor: "#ffff"}}>
          <div className="field">
            <div className="control">
              <p>{notice}</p>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Select
                options={options}
                name="from_id"
                placeholder="Viajo desde..."
                value={inputValues.trip.from_id}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' 
              name='from_address' 
              placeholder='Dirección de origen'
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Select
                options={options}
                name="to_id"
                placeholder="Viajo hacia..."
                value={inputValues.trip.to_id}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' 
              name='to_address' 
              placeholder='Dirección de destino' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='number' 
              name='available_seats' 
              placeholder='Número de asientos disponibles' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='datetime-local' 
              name='leaving_at' 
              placeholder='Hora de salida' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
                type='text' 
                name='price' 
                placeholder='Monto a pagar' 
                onChange={handleChange}
                required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' 
              name='comments' 
              placeholder='Comentario' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' 
              name='car_license_plate' 
              placeholder='Patente' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' 
              name='car_brand' 
              placeholder='Marca del auto' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' 
              name='car_model' 
              placeholder='Modelo del auto'
              onChange={handleChange} 
              required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' 
              name='car_color' 
              placeholder='Color del auto' 
              onChange={handleChange}
              required/>
            </div>
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" 
             type='submit'>Crear viaje</button>
           </div>           
          </div>
         
      </form>


  ); 
}

export default newTrip;