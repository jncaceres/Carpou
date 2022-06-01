import React from "react";
import TripForm from "./TripForm";
import background from "../assets/background.jpg";

const Home = (props) => {
  const { places } = props;
  return (
    <>
      <div
        className="hero is-link home-banner"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="hero-body">
          <div className="content">
            <h1 className="title" style={{ marginTop: -20 }}>
              Encuentra viajes en auto, a precio barato
            </h1>
          </div>
        </div>
      </div>
      <div className="section" style={{ marginTop: -120 }}>
        <TripForm places={places} />
      </div>
    </>
  );
};
export default Home;
