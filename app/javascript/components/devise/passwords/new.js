import React from "react";
import background from "../../../assets/background.png";

const EmailForm = (props) => {
    return (
      <div className="card">
        <form id="new_user" action={props.password_path} acceptCharset="UTF-8" method="post" style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#f5efef"}}>
            <div className="field">
                <div className="control">
                    <input type="hidden" name="authenticity_token" value={document.getElementsByName("csrf-token")[0].getAttribute("content")} autoComplete="off"></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input placeholder="Correo" className="input" id="user_email" name="user[email]" type="email" autoFocus="autofocus" autoComplete="email" required/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="button is-primary is-fullwidth" type="submit" name="commit" value="Resetear contraseña"></input>
                </div>
            </div>
        </form>
    </div>
    );
  };

const New = (props) => {
  return (
    <>
      <div className="columns is-centered">
        <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          <div className="hero home-banner has-text-centered">
            <h1 className="title" style={{ marginTop: 25 }}>
              ¿Olvidaste tu contraseña?
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
            <EmailForm password_path={props.password_path}/>
          </div>
        </div>
      </div>
    </>
  );
};
export default New;