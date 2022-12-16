import React from "react";
import { CardImgAboutUs,H4Link, ImgContainer, DescriptionCardConteiner, SingleAboutCardContainer } from "../styles/Card";
import "./CardAboutUs.css";
const CardAboutUs = ({ name, picture, description,linkedIn,gitHub }) => {

  console.log ("PROPS:",linkedIn,gitHub)
  return (
    <SingleAboutCardContainer>
      <h3>{name}</h3>
      <ImgContainer>
      <CardImgAboutUs src={picture} />
      </ImgContainer>
      <DescriptionCardConteiner>
      <h4>{description}</h4>
      </DescriptionCardConteiner>
      
      <a href={linkedIn} className="linkCard">LinkedIn</a>
      
      <br></br>
      <a href={gitHub} className="linkCard">GitHub</a>
      
    </SingleAboutCardContainer>
  );

};

export default CardAboutUs;
