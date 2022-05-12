import React from "react";
import background from "../../../assets/background.jpg";

const RegistrationForm = (props) => {
    return (
        <form name="users" action = {props.registration_path} 
        method= "post" 
        acceptCharset="UTF-8" 
        style={{border: "1px solid #f5efef", padding: 10,
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
              <input className="input" type='text' name='user[name]' placeholder='Nombre' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='user[last_name]' placeholder='Apellido' required/>
            </div>
          </div> 
          <div className="field">
            <div className="control">
              <input className="input" type='rut' name='user[rut]' placeholder='RUT' required/>
            </div>  
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='text' name='user[phone]' placeholder='Telefono' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label>
                Género
                <select name= "user[gender]" className="input" required>    
                <option value= "Femenino">Femenino</option>
                <option value= "Masculino">Masculino</option>
                </select>
              </label>
              
            </div> 
          </div>
          <div className="field">
            <div className="control">
              <label>
                Fecha de nacimiento
                <input className="input" type='date' name='user[birthdate]' placeholder='Fecha de cumpleaños' required/>
              </label>
              
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='email' name='user[email]' placeholder='Email' required/>
            </div>  
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='password' name='user[password]' placeholder='Contraseña' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type='password' name='user[password_confirmation]' placeholder='Confirmar contraseña' required/>
            </div>
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" type='submit'>Confirmar</button>
           </div>           
          </div>
        </form>
      );
}

const registrationIndex = (props) => {
  return (
    <>
    <div
      className="hero is-link home-banner"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="hero-body">
        <div className="content">
          <h1 className="title" style={{ marginTop: -20 }}>
            Registrarse
          </h1>
        </div>
      </div>
    </div>
    <div className="section" style={{ marginTop: -120 }}>
      <RegistrationForm registration_path={props.registration_path}/>
      
    </div>
  </>
  )
}

export default registrationIndex;