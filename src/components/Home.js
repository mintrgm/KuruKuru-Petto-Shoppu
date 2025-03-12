import React from "react";
import "./Home.css";
import homeImage from "../assets/zoo.png";

const Home = () => {
  return (
    <div className="home">
      <img src={homeImage} alt="KuruKuru Petto Shoppu" className="home-image" />
    </div>
  );
};

export default Home;
