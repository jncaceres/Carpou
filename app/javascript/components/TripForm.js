import React from "react";
import Select from "react-select";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const TripForm = () => {
  return (
    <div style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#ffff"}}>
      <div className="field">
        <div className="control">
           <Select options={options} name="from" placeholder="Viajo desde..." />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <Select options={options} name="to" placeholder="Viajo hacia..." />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input className="input" type="date" placeholder="Hoy" />
        </div>
      </div>
      <div className="field">
      <div className="control">
        <button className="button is-primary is-fullwidth">Buscar viajes</button>
      </div>
      </div>
    </div>

  );
};
export default TripForm;
