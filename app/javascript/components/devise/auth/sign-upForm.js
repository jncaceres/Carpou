import React from "react";
//import background from "../../../assets/background.jpg";

const registrationForm = (props) => {
    return (
        <form action = {props.registration_path} method= "post" acceptCharset="UTF-8">
        <div className="field">
            <div className="control">
                <input type="hidden" name="authenticity_token" value={document.getElementsByName("csrf-token")[0].getAttribute("content")} autoComplete="off"></input>
            </div>
        </div>
          <input
          type='text'
          name='name'
          placeholder='Nombre'
          required
          />
          <input
          type='text'
          name='last_name'
          placeholder='Apellido'
          required
          />
          <input
          type='rut'
          name='rut'
          placeholder='RUT'
          required
          />
          <input
          type='text'
          name='phone'
          placeholder='Telefono'
          required
          />
          <select
          name='gender'
          placeholder='Género'
          />
          <option value = "Femenino">Femenino</option>
          <option value ="Masculino">Masculino</option>
          <input
          type='date'
          name='birthdate'
          placeholder='Fecha de cumpleaños'
          required
          />
          <input
          type='email'
          name='email'
          placeholder='Email'
          required
          />

          <input
          type='password'
          name='password'
          placeholder='Contraseña'
          required
          />

          <input
          type='password'
          name='password_confirmation'
          placeholder='Confirmación de contraseña'
          required
          />

          <button type='submit'>Confirmar</button>
          
        </form>
      );
}




export default registrationForm;