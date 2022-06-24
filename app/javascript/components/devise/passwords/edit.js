import React from "react";
import background from "../../../assets/background.png";

const PasswordForm = (props) => {
    const { password_path, reset_password_token } = props;
    return (
      <div className="card">
        <form id="edit_password" action={password_path} acceptCharset="UTF-8" method="post" style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#f5efef"}}>
            <input type="hidden" name="_method" value="put" />
            <div className="field">
                <div className="control">
                    <input type="hidden" name="authenticity_token" value={document.getElementsByName("csrf-token")[0].getAttribute("content")} autoComplete="off"></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input type="hidden" name="user[reset_password_token]" value={reset_password_token} autoComplete="off"></input>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label htmlFor="password"> Contraseña: </label>
                    <input className="input" id="password" name="user[password]" type="password" autoFocus="autofocus" autoComplete="new-password" />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label htmlFor="password_confirmation"> Confirmación de contraseña: </label>
                    <input className="input" id="password_confirmation" name="user[password_confirmation]" type="password" autoFocus="autofocus" autoComplete="new-password" />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="button is-primary is-fullwidth" type="submit" name="commit" value="Cambiar contraseña"></input>
                </div>
            </div>
        </form>
    </div>
    );
  };

const Edit = (props) => {
    const { password_path, reset_password_token } = props;
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
              <PasswordForm password_path={password_path} reset_password_token={reset_password_token}/>
            </div>
          </div>
          </div>
        </>
      );
}

export default Edit;