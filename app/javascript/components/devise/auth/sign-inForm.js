import React from "react";
import background from "../../../assets/background.jpg";

const LoginForm = (props) => {
    return(
        <form action = {props.user_session_path}
        method="post"
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
                    <input name="user[email]" className="input" placeholder="Email"/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input" name="user[password]" type= "password" placeholder="Contraseña"/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button className="button is-primary is-fullwidth" type='submit'>Ingresar</button>
                </div>
            </div>
            <div className="field">
                <div className="control">
                  <a href={props.user_registration_path}>¿Aún no tienes cuenta? Regístrate acá</a>
                </div>
            </div>
           
        </form>

    );

};

const loginIndex = (props) => {
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
                Iniciar Sesión
              </h1>
            </div>
          </div>
        </div>
        <div className="section" style={{ marginTop: -120 }}>
          <LoginForm user_session_path={props.user_session_path} user_registration_path= {props.user_registration_path}/>
          
        </div>
      </>
      )

}
export default loginIndex;