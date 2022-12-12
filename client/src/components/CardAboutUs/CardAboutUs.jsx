import React from "react";

const CardAboutUs = ({ name, picture, description }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={picture} />
      <h4>{description}</h4>
    </div>
  );
};

export default CardAboutUs;
