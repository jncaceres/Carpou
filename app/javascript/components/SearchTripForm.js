import React, { useState } from "react";
import Select from "react-select";
import { routes } from "../api";

const SearchTripForm = (props) => {
  const { places } = props;
  const options = places.map((place) => ({
    value: place.id,
    label: place.name,
  }));
  const [from, setFrom] = useState(options[0]);
  const [to, setTo] = useState(options[options.length - 1]);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));

  const handleFromChange = (e) => {
    setFrom(e);
  };

  const handleToChange = (e) => {
    setTo(e);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const tripParams = { from: from.value, to: to.value, date: date };

  return (
    <div
      className="card"
      style={{
        border: "1px solid #f5efef",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#f5efef",
      }}
    >
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field is-expanded">
            <div className="control">
              <Select
                options={options}
                name="from"
                placeholder="Viajo desde..."
                value={from}
                onChange={handleFromChange}
              />
            </div>
          </div>
          <div className="field is-expanded">
            <div className="control">
              <Select
                options={options}
                name="to"
                placeholder="Viajo hacia..."
                value={to}
                onChange={handleToChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="date"
            placeholder="Hoy"
            min={new Date().toLocaleDateString("en-CA")}
            value={date}
            onChange={handleDateChange}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <a href={routes.trips.index(tripParams)}>
            <button className="button is-primary is-fullwidth" type="submit">
              Buscar viajes
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default SearchTripForm;
