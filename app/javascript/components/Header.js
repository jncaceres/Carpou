import React, {useState} from "react";
import logo from "../assets/logo.png";

const Header = (props) => {
  const { user, mytrips_route, logout_route, root_path, login_route, register_route, new_trip_route } = props;
  const [showNav, setShowNav] = useState(false);
  return (
    <>
    <nav className="navbar" role="navigation" aria-label="main navigation" id="navMenu">
      <div className="navbar-brand">
        <a className="navbar-item" href={root_path}>
          <img src={logo} alt="CarPou" width="112" height="28" />
        </a>

        <div
          className={`navbar-burger ${showNav ? 'is-active': ''}`}
          onClick={() => setShowNav(!showNav)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>


        <div className={`navbar-menu ${showNav ? 'is-active': ''}`}>
          {user ? 
          <>
          <div className="navbar-item">
            <h5 className="title is-5">Bienvenido {user.name} {user.last_name}!</h5>
          </div>

          <a className="navbar-item"  data-method="get" href={mytrips_route}>
            Mis viajes
          </a>
          <a className="navbar-item"  data-method="get" href={ new_trip_route}>
            Crear viaje
          </a>

          <a className="navbar-item"  data-method="delete" href={logout_route}>
            Cerrar sesión
          </a>
          </>
        :
          <>
            <a className="navbar-item" href={login_route}>
              Iniciar sesión
            </a>
            <a className="navbar-item" href={register_route}>
              Registrarme
            </a>
          </>
        }
        </div>
      </div>
    </nav>
  </>
  );
};
export default Header;
