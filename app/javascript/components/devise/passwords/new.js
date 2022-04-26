import React from "react";
import background from "../../../assets/background.jpg";

const EmailForm = (props) => {
    return (
    <form id="new_user" action={props.password_path} accept-charset="UTF-8" method="post" style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#ffff"}}>
        <div className="field">
            <div className="control">
                <input type="hidden" name="authenticity_token" value={document.getElementsByName("csrf-token")[0].getAttribute("content")} autocomplete="off"></input>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <label for="email"> Correo: </label>
                <input className="input" id="user_email" name="user[email]" type="email" autofocus="autofocus" autocomplete="email"/>
            </div>
        </div>
        <div className="field">
            <div className="control">
                <input className="button is-primary is-fullwidth" type="submit" name="commit" value="Resetear contraseña"></input>
            </div>
        </div>
    </form>
    );
  };

const New = (props) => {
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
              ¿Olvidaste tu contraseña?
            </h1>
          </div>
        </div>
      </div>
      <div className="section" style={{ marginTop: -120 }}>
        <EmailForm password_path={props.password_path}/>
      </div>
    </>
  );
};
export default New;