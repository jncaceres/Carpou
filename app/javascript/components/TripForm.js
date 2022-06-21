import React, { useState } from "react";
import { routes } from "../api";
const TripForm = (props) => {
    const { user,  places, trip } = props;
    const date = () => {
      const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      let today = new Date();
      let min;
      if(today.getMinutes()<10) min= '0'+today.getMinutes()
      else min = today.getMinutes();
      let hour;
      if(today.getHours()<10) hour= '0'+today.getHours()
      else hour = today.getHours();
      let today_format = today.getFullYear() + '-' + months[today.getMonth()] + '-' + 
      today.getDate()+'T'+ hour+':'+ min;
      return today_format;

    }
    const [inputValues, setInputValues] = useState({
      
        "trip[from_id]": trip ? trip.from_id : 1,
        "trip[to_id]": trip ? trip.to_id : 2,
        "trip[from_address]": trip ? trip.from_address : '',
        "trip[to_address]": trip ? trip.to_address : '',
        "trip[available_seats]": trip ? trip.available_seats : '',
        "trip[leaving_at]": trip ? trip.leaving_at : '',
        "trip[price]": trip ? trip.price : '',
        "trip[comments]": trip ? trip.comments : '',
        "trip[car_license_plate]": trip ? trip.car_license_plate : '',
        "trip[car_brand]": trip ? trip.car_brand : '',
        "trip[car_model]": trip ? trip.car_model : '',
        "trip[car_color]": trip? trip.car_color : ''
      
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
      if (inputValues["trip[from_address]"]!='' && !inputValues["trip[from_address]"].match(/\d+/g)){
        error.from_address = 'Ingresar una direccion válida';
        check.from_address = false;
        
        
      } else{
        check.from_address = true;
        error.from_address = ''
      }
      if (inputValues["trip[to_address]"]!='' && !inputValues["trip[to_address]"].match(/\d+/g)){
        error.to_address = 'Ingresar una direccion válida';
        check.to_address = false;
      
   
      } else{
        check.to_address = true;
        error.to_address = '';
      } 
      if(inputValues["trip[price]"]!='' && parseInt(inputValues["trip[price]"]) > 500000){
        error.price = 'El monto no puede superar los $500.000';
        check.price = false;

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
        
            ...prevState,
            [name]: value
          
        }));
      }
    const sendData = () =>{
      
      fetch(trip ? routes.trips.update(trip.id) : routes.trips.post(),{
        method: trip ? "PUT" : "POST",
        headers: {
          'X-CSRF-Token':document.getElementsByName("csrf-token")[0].getAttribute("content")
        },
        body: new FormData(document.getElementById('create-trip-form'))
      }).then((response) => {
        window.location.href = response.url;
      }).catch(err => console.log(err))
  
    }  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(valid.from_address && valid.to_address && valid.price){
        sendData(); 
      }
    }

    return (
        <form 
            onSubmit={(e) => handleSubmit(e)}
            acceptCharset="UTF-8" 
            id="create-trip-form"
            style={{border: "1px solid #f5efef", padding: 20,
            borderRadius: 10, backgroundColor: "#f5efef"}}>
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
                <div className="control">
                  <label>Viajo desde...</label>
                <select className="input" name='trip[from_id]'
                onChange={handleChange}
                
                 defaultValue={inputValues['trip[from_id]']}>
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
                <select className="input" name = 'trip[to_id]' 
                onChange={handleChange}
                defaultValue={inputValues['trip[to_id]' ]}>
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
                  name='trip[from_address]' 
                  placeholder='Dirección de origen' 
                  defaultValue={inputValues.from_address}
                  onChange={handleChange}
                  onBlur={checkValidation}
                  required/>
                </div>
                {!valid.from_address? <p>{validation.from_address}</p> : null}
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='trip[to_address]' 
                  placeholder='Dirección de destino' 
                  onChange={handleChange}
                  onBlur={checkValidation}
                  defaultValue={inputValues.to_address} required/>
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
                  type='number' name='trip[available_seats]' 
                  placeholder='Número de asientos disponibles' 
                  onChange={handleChange}
                  max='50'
                  min='1'
                  defaultValue={inputValues.available_seats} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='trip[price]' 
                  placeholder='Monto a pagar' 
                  onChange={handleChange}
                  onBlur={checkValidation}
                  max="500000"
                  defaultValue={inputValues.price} required/>
                </div>
                {!valid.price? <p>{validation.price}</p> : null}
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='datetime-local' 
                  name='trip[leaving_at]' 
                  placeholder='Hora de salida' 
                  onChange={handleChange}
                  min = {date()}
                  value={inputValues['trip[leaving_at]']}
                   required/>
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
                  type='text' name='trip[car_license_plate]' 
                  placeholder='Patente' 
                  onChange={handleChange}
                  defaultValue={inputValues.car_license_plate} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='trip[car_brand]' 
                  placeholder='Marca del auto' 
                  onChange={handleChange}
                  defaultValue={inputValues.car_brand} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='trip[car_model]' 
                  placeholder='Modelo del auto' 
                  onChange={handleChange}
                  defaultValue={inputValues.car_model} required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' name='trip[car_color]'
                  placeholder='Color del auto' 
                  onChange={handleChange}
                  defaultValue={inputValues.car_color} required/>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='text' name='trip[comments]' 
              placeholder='Comentario' 
              onChange={handleChange}
              defaultValue={inputValues.comments}/>
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
             <button className="button is-primary is-fullwidth" 
             type='submit'>{trip ? 'Editar viaje' : 'Crear viaje'}</button>
           </div>           
          </div>

      </form>
    )

}
export default TripForm;