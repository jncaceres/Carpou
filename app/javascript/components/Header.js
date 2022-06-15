import React, { useState } from "react";
import logo from "../assets/logo.png";
import { routes } from "../api";
const Header = (props) => {
  const {
    user,
    mytrips_route,
    my_requests_route,
    logout_route,
    root_path,
  } = props;

  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        id="navMenu"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href={root_path}>
            <img src={logo} alt="CarPou" width="112" height="28" />
          </a>

          <div
            className={`navbar-burger ${showNav ? "is-active" : ""}`}
            onClick={() => setShowNav(!showNav)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>
        <div className={`navbar-menu ${showNav ? "is-active" : ""}`}>
          {user ? (
            <>
              <div className="navbar-item">
                <h5 className="title is-5">
                  Bienvenido {user.name} {user.last_name}!
                </h5>
              </div>

          <a className="navbar-item"  data-method="get" href={mytrips_route}>
            Mis viajes
          </a>
          <a className="navbar-item"  data-method="get" href={routes.trips.new()}>
            Crear viaje
          </a>
          <a className="navbar-item" data-method="get" href={my_requests_route}>
            Mis solicitudes
          </a>

              <a
                className="navbar-item"
                data-method="delete"
                href={logout_route}
              >
                Cerrar sesión
              </a>
            </>
          ) : (
            <>
              <a className="navbar-item" href={routes.users.session()}>
                Iniciar sesión
              </a>
              <a className="navbar-item" href={routes.users.registration()}>
                Registrarme
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default Header;
