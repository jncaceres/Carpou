import React from "react";
import logo from "../assets/logo.png";

const Header = (props) => {
  const { user, logout_route, root_path, login_route } = props;
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href={root_path}>
          <img src={logo} alt="CarPou" width="112" height="28" />
        </a>

        {user ? 
        <>
        <div className="navbar-item">
          <h5 className="title is-5">Bienvenido {user.name} {user.last_name}!</h5>
        </div>

        <a className="navbar-item"  data-method="delete" href={logout_route}>
          Cerrar sesión
        </a>
        </>
      :
        <>
        <div className="navbar-item">
          <a className="navbar-item" href={login_route}>
            Iniciar sesión
          </a>
        </div>
        </>
      }

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
  );
};
export default Header;
