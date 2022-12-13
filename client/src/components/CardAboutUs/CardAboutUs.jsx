import React from "react";
import { CardImg,H4Link, ImgContainer, SingleAboutCardContainer } from "../styles/Card";
import "./CardAboutUs.css";
const CardAboutUs = ({ name, picture, description,linkedIn,gitHub }) => {

  console.log ("PROPS:",linkedIn,gitHub)
  return (
    <SingleAboutCardContainer>
      <h3>{name}</h3>
      <ImgContainer>
      <CardImg src={picture} />
      </ImgContainer>
      <h4>{description}</h4>
      
      <a href={linkedIn} className="linkCard">LinkedIn</a>
      
      <br></br>
      <a href={gitHub} className="linkCard">gitHub</a>
      
    </SingleAboutCardContainer>
  );

};

export default CardAboutUs;
