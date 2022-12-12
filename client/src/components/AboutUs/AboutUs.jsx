import React from "react";
import Card from "../Card/Card";
import CardAboutUs from "../CardAboutUs/CardAboutUs";
import { Link } from "react-router-dom";

import NavBar from "../NavBar/NavBar";

const AboutUs = () => {
  const people = [
    {
      name: "Germán",
      picture: "",
      description: "",
    },
    {
      name: "Andrea",
      picture: "",
      description: "",
    },
    {
      name: "Gabriel",
      picture: "",
      description: "",
    },
    {
      name: "Adrian Laborde",
      picture: "",
      description: "",
    },
    {
      name: "Ignacio",
      picture: "",
      description: "",
    },
    {
      name: "Kevin",
      picture: "",
      description: "",
    },
  ];

  // name,picture,description
  return (
    <div>
      <NavBar />
      <div>
        <Link to={"/home"}>
          <button>Back to Home</button>
        </Link>
      </div>
      <h1>About Us</h1>
      {people?.map((p) => {
        return (
          <div key={p.name}>
            <CardAboutUs
              name={p.name}
              picture={p.picture}
              description={p.description}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AboutUs;
