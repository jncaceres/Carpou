import React from "react";

//import background from "../../../assets/background.jpg";

const registrationForm = (props) => {
    return (
        <form action = {props.registration_path} method= "post" acceptCharset="UTF-8">
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
            <input type='text' name='name' placeholder='Nombre' required/>
          </div>
          <div className="field">
            <input type='text' name='last_name' placeholder='Apellido' required/>
          </div> 
          <div className="field">
            <input type='rut' name='rut' placeholder='RUT' required/>
          </div>
          <div>
            <input type='text' name='phone' placeholder='Telefono' required/>
          </div>
          <div className="field">
            <select required>    
              <option value= "F">Femenino</option>
              <option value= "M">Masculino</option>
            </select>
          </div>
          <div className="field">
            <input type='date' name='birthdate' placeholder='Fecha de cumpleaños' required/>
          </div>
          <div className="field">
            <input type='email' name='email' placeholder='Email' required/>
          </div>
          <div className="field">
            <input type='password' name='password' placeholder='Contraseña' required/>

          </div>
          <div className="field">
            <input type='password' name='password_confirmation' placeholder='Confirmar contraseña' required/>
          </div>
          <div className="field">
           <div className="control">
             <button type='submit'>Confirmar</button>
           </div>
            
          </div>

      
        </form>
      );
}




export default registrationForm;