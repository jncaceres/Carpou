import React from "react";

export const TripButton = ({ buttonText = "", route = "" }) => {
  return (
    <div className="columns is-multiline is-mobile">
      <div className="column is-full-mobile">
        <a href={route}>
          <button className="button is-primary is-fullwidth">
            {buttonText}
          </button>
        </a>
      </div>
    </div>
  );
};
