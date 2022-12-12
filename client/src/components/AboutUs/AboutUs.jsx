import React from "react";
import Card from "../Card/Card";
import CardAboutUs from "../CardAboutUs/CardAboutUs";
import { Link } from "react-router-dom";


import NavBar from "../NavBar/NavBar";

const AboutUs = () => {
  const people=[{
    name:'Germán Leithner',
    picture: 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
    description:'null'
  },{
    name:'Andrea Palomeque',
    picture: 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
    description:'null'
  },{
    name:'Gabriel Basilio',
    picture: 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
    description:'null'
  },{
    name:'Adrian Laborde',
    picture: 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
    description:'null'
  },{
    name:'Ignacio Luna',
    picture: 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
    description:'null'
  },{
    name:'Kevin Tavara',
    picture: 'https://pbs.twimg.com/profile_images/1012362101510160384/EjayQ10E_400x400.jpg',
    description:'null'
  }
]

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
