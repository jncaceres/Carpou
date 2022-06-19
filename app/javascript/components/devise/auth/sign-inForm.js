import React from "react";
import background from "../../../assets/background.png";

const LoginForm = (props) => {
    const {user_session_path,  forgot_password_path} = props;
    return(
      <>
        <div className="card">
          <form action = {user_session_path}
            method="post"
            acceptCharset="UTF-8" 
            style={{ border: "1px solid #f5efef", padding: 10, borderRadius: 10, background: '#f5efef' }}>
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
                      <input name="user[email]" className="input" placeholder="Email" required/>
                  </div>
              </div>
              <div className="field">
                  <div className="control">
                      <input className="input" name="user[password]" type= "password" placeholder="Contraseña" required/>
                  </div>
              </div>
              <div className="field">
                  <div className="control">
                      <button className="button is-primary is-fullwidth" type='submit'>Ingresar</button>
                  </div>
              </div>       
          </form>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-half">
            <br/>
            <p className="bd-notification is-primary has-text-centered ">
              <a href={forgot_password_path}>¿Haz olvidado tu contraseña?</a>
            </p>
            <p className="bd-notification is-primary has-text-centered">
              <a href={props.user_registration_path}>¿Aún no tienes cuenta? Regístrate acá</a>
            </p>
          </div>
        </div>
      </>
    );

};

const loginIndex = (props) => {
  const {user_session_path,  forgot_password_path, user_registration_path} = props;
    return (
        <>
          <div className="columns is-centered">
            <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-half-widescreen is-half-fullhd">
              <div className="hero home-banner has-text-centered">
                <h1 className="title" style={{ marginTop: 25 }}>
                  Iniciar Sesión
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
                <LoginForm user_session_path={user_session_path} forgot_password_path={forgot_password_path} user_registration_path= {user_registration_path}/>
              </div>
            </div>
          </div>
      </>
      )

}
export default loginIndex;