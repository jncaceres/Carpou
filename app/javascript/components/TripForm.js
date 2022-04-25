import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
]

const TripForm = () => {
  const [from, setFrom] = useState({value: 1, label: 'Chocolate'});
  const [to, setTo] = useState({ value: 2, label: 'Strawberry' });
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));

  const handleFromChange = (e) => {
    setFrom(e);
  }

  const handleToChange = (e) => {
    setTo(e);
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const onSubmit = () => {
    window.location.href = `${process.env.URL}/trips?from=${from.value}&to=${to.value}&date=${date}`;
  }
  
  return (
    <div style={{border: "1px solid #f5efef", padding: 10, borderRadius: 10, backgroundColor: "#ffff"}}>
      <div className="field">
        <div className="control">
           <Select options={options} name="from" placeholder="Viajo desde..." value={from} onChange={handleFromChange} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <Select options={options} name="to" placeholder="Viajo hacia..." value={to} onChange={handleToChange} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input className="input" type="date" placeholder="Hoy" value={date} onChange={handleDateChange} />
        </div>
      </div>
      <div className="field">
      <div className="control">
        <button className="button is-primary is-fullwidth" onClick={onSubmit}>Buscar viajes</button>
      </div>
      </div>
    </div>

  );
};
export default TripForm;
