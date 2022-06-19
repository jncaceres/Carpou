import React from "react";
import SearchTripForm from "./SearchTripForm";
import background from "../assets/background.png";

const Home = (props) => {
  const { places } = props;
  return (
    <>
      <div className="columns is-centered">
        <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-half-widescreen is-half-fullhd">
          <div className="hero home-banner">
            <h1 className="title" style={{ marginTop: 25 }}>
              Encuentra viajes en auto, a precio barato
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
          <div className="section" style={{marginTop: 45}}>
            <SearchTripForm places={places} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
