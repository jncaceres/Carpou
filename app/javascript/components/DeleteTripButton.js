
import React from "react";

export const DeleteTripButton = ({ buttonText = "", route = "" }) => {
  return (
    <div className="columns is-multiline is-mobile">
      <div className="column is-full-mobile">
        <a className="button is-danger is-fullwidth" href={route} data-method="delete" data-confirm="¿Estas seguro de querer cancelar este viaje?">
          {buttonText}
        </a>
      </div>
    </div>
  );
};
