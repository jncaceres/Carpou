import React from "react";
import background from "../../../assets/background.png";


const RegistrationForm = (props) => {
    return (
      <div className="card">
        <form name="users" 
          action = {props.registration_path} 
          method= "post" 
          acceptCharset="UTF-8" 
          style={{border: "1px solid #f5efef", padding: 10,
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
                  <input className="input" type='text' name='user[name]' placeholder='Nombre' required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" type='text' name='user[last_name]' placeholder='Apellido' required/>
                </div>
              </div>
            </div>
          </div> 
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
              <div className="control">
                <input className="input" type='rut' name='user[rut]' placeholder='RUT' required/>
              </div>  
            </div>
            <div className="field is-expanded">
              <div className="control">
                <input className="input" type='text' name='user[phone]' placeholder='Telefono' required/>
              </div>
            </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
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
            <div className="field is-expanded">
              <div className="control">
                <label>
                  Fecha de nacimiento
                  <input className="input" type='date' name='user[birthdate]' placeholder='Fecha de cumpleaños' required/>
                </label>
                
              </div>
            </div>
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
      </div>
      );
}

const registrationIndex = (props) => {
  return (
    <>
    <div className="columns is-centered">
      <div className="column has-text-centered is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div className="hero home-banner">
          <h1 className="title" style={{ marginTop: 25 }}>
            Registrarse
          </h1>
          <figure>
            <img src={background} 
            style={{
              marginTop: -5,
              marginLeft: 'auto',
              marginRight: 'auto',
              height: '25em',
            }}/> 
          </figure>                
        </div>
        <div className="section" style={{ marginTop: 45 }}>
          <RegistrationForm registration_path={props.registration_path}/>
        </div>
      </div>
    </div>
  </>
  )
}

export default registrationIndex;