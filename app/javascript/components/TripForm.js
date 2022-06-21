import React, { useState } from "react";
import { routes } from "../api";
const TripForm = (props) => {
    const { user,  places, trip } = props;
    const date = () => {
      const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      let today = new Date();
      let today_format = today.getFullYear() + '-' + months[today.getMonth()] + '-' + 
      today.getDate()+'T'+ today.getHours()+':'+ today.getMinutes();
      return today_format;

    }
    const [inputValues, setInputValues] = useState({
      authenticity_token: document.getElementsByName("csrf-token")[0].getAttribute("content"),
      trip: {
        from_id: trip ? trip.from_id : 1,
        to_id: trip ? trip.to_id : 2,
        from_address: trip ? trip.from_address : '',
        to_adrress: trip ? trip.to_adrress : '',
        available_seats: trip ? trip.available_seats : '',
        leaving_at: trip ? trip.leaving_at : '',
        price: trip ? trip.price : '',
        comments: trip ? trip.comments : '',
        car_license_plate: trip ? trip.car_license_plate : '',
        car_brand: trip ? trip.car_brand : '',
        car_model: trip ? trip.car_model : '',
        car_color: trip? trip.car_color : '',
        user_id: trip ? trip.user_id : user.id
      }
    });
    const [validation, setValidation] = useState({
      from_address: '',
      to_address: '',
      price: '',

    })
    const [valid, setValid] = useState({
      from_address: false,
      to_address: false,
      price: false
    });

    const checkValidation = () => {
      let error = validation;
      let check = valid;
      if (inputValues.trip.from_address!='' && !inputValues.trip.from_address.match(/\d+/g)){
        error.from_address = 'Ingresar una direccion válida'
        
        
      } else{
        check.from_address = true;
        error.from_address = ''
      }
      if (inputValues.trip.to_address!='' && !inputValues.trip.to_adrress.match(/\d+/g)){
        error.to_address = 'Ingresar una direccion válida'
   
      } else{
        check.to_address = true;
        error.to_address = '';
      } 
      if(inputValues.trip.price!='' && parseInt(inputValues.trip.price) > 500000){
        error.price = 'El monto no puede superar los $500.000'
      }else{
        error.price = '';
        check.price = true;
      }
      setValidation(error);
      setValid(check);

    };
    const handleChange = (e) => {
      const { name, value } = e.target;
       setInputValues(
        (prevState) =>({
          authenticity_token: prevState.authenticity_token,
          trip :{
            ...prevState.trip,
            [name]: value
          }
        }));
      }
    const sendData = (data) =>{
      fetch(trip ? routes.trips.update(trip.id) : routes.trips.post(),{
        method:trip ? "PUT" : "POST",
        body: {params: data}
      })
  
    }  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(valid.from_address && valid.to_address && valid.price){
        console.log("ACa");
        sendData.then((response) => {
          if (response.redirected) {
            window.location.href = response.url;
          }
        });
      }
    }

    return (
        <form 
            acceptCharset="UTF-8" 
            style={{border: "1px solid #f5efef", padding: 20,
            borderRadius: 10, backgroundColor: "#f5efef"}}>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <label>Viajo desde...</label>
                <select className="input" name='from_id'
                onChange={handleChange}
                
                 defaultValue={inputValues.trip.from_id}>
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
                <div className="control">
                <label>Viajo hacia...</label>
                <select className="input" name = 'to_id' 
                onChange={handleChange}
                defaultValue={inputValues.trip.to_id}>
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
                  <input className="input" 
                  type='text' 
                  name='from_address' 
                  placeholder='Dirección de origen' 
                  defaultValue={inputValues.trip.from_address}
                  onChange={handleChange}
                  onBlur={checkValidation}
                  required/>
                </div>
                {!valid.from_address? <p>{validation.from_address}</p> : null}
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='to_address' 
                  placeholder='Dirección de destino' 
                  onChange={handleChange}
                  onBlur={checkValidation}
                  defaultValue={inputValues.trip.to_adrress} required/>
                </div>
                {!valid.to_address? <p>{validation.to_address}</p> : null}
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='number' name='available_seats' 
                  placeholder='Número de asientos disponibles' 
                  onChange={handleChange}
                  max='50'
                  defaultValue={inputValues.trip.available_seats} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='price' 
                  placeholder='Monto a pagar' 
                  onChange={handleChange}
                  onBlur={checkValidation}
                  max="500000"
                  defaultValue={inputValues.trip.price} required/>
                </div>
                {!valid.price? <p>{validation.price}</p> : null}
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='datetime-local' 
                  name='leaving_at' 
                  placeholder='Hora de salida' 
                  onChange={handleChange}
                  min={date()}
                  value={inputValues.trip.leaving_at} required/>
                </div>
              </div>
            </div>
          </div>
          <label className="label">Información del auto: </label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='car_license_plate' 
                  placeholder='Patente' 
                  onChange={handleChange}
                  defaultValue={inputValues.trip.car_license_plate} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='car_brand' 
                  placeholder='Marca del auto' 
                  onChange={handleChange}
                  defaultValue={inputValues.trip.car_brand} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='car_model' 
                  placeholder='Modelo del auto' 
                  onChange={handleChange}
                  defaultValue={inputValues.trip.car_model} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='car_color'
                  placeholder='Color del auto' 
                  onChange={handleChange}
                  defaultValue={inputValues.trip.car_color} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' name='comments' 
              placeholder='Comentario' 
              onChange={handleChange}
              defaultValue={inputValues.trip.comments}/>
            </div>
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" 
             onSubmit={handleSubmit}
             type='submit'>{trip ? 'Editar viaje' : 'Crear viaje'}</button>
           </div>           
          </div>
      </form>
    )

}
export default TripForm;